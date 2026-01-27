const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Ensure evidence directory exists
const evidenceDir = path.join(__dirname, 'evidence');
if (!fs.existsSync(evidenceDir)) fs.mkdirSync(evidenceDir);

const logFile = path.join(__dirname, 'verification.log');
const log = (msg) => {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
};

// Clear log
fs.writeFileSync(logFile, '');

(async () => {
  log('Starting ROBUST UI Verification...');
  // Launch in headless mode, but with a fixed viewport to ensure layout matches desktop
  const browser = await chromium.launch();
  const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  
  try {
    // 1. Go to Home Page
    log('Navigating to http://localhost:3000...');
    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
        log('Network idle timed out, proceeding anyway (page might be dynamic)...');
    }
    
    // Screenshot Home
    await page.screenshot({ path: path.join(evidenceDir, 'home_initial.png') });
    log('Captured home_initial.png');

    // 2. Check Trust Strip
    log('\n--- Checking Trust Strip ---');
    // Identify the python badge by text
    const pythonBadge = page.getByText('Python').first();
    
    // Scroll into view to ensure hover works
    if (await pythonBadge.count() > 0) {
        log('Found Python badge locator.');
        await pythonBadge.scrollIntoViewIfNeeded();
        
        // Initial Style
        const initialStyle = await pythonBadge.evaluate((el) => window.getComputedStyle(el).color);
        log(`Badge Color (Initial): ${initialStyle}`);
        
        // Hover
        await pythonBadge.hover();
        await page.waitForTimeout(1000); // Wait for transition
        
        // Hover Style
        const hoverStyle = await pythonBadge.evaluate((el) => window.getComputedStyle(el).color);
        log(`Badge Color (Hover): ${hoverStyle}`);
        
        await page.screenshot({ path: path.join(evidenceDir, 'trust_strip_hover.png') });
        log('Captured trust_strip_hover.png');
    } else {
        log('FAILED: Trust Strip "Python" badge not found in DOM.');
    }

    // 3. Check Projects Page & Card Hover
    log('\n--- Checking Projects Page Card ---');
    await page.goto('http://localhost:3000/projects', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000); // Allow hydration
    
    // Find the first project card with class 'group' (standard Tailwind class for hover groups)
    const card = page.locator('.group').first();
    
    if (await card.count() > 0) {
        log('Found Project Card.');
        await card.scrollIntoViewIfNeeded();
        
        // Force hover state using Playwright
        await card.hover();
        await page.waitForTimeout(1000); // Wait for opacity transition
        
        await page.screenshot({ path: path.join(evidenceDir, 'project_card_hover.png') });
        log('Captured project_card_hover.png');
        
        // Find the "View Case Study" text. It is inside the overlay.
        const buttonText = card.getByText('View Case Study').first();
        
        if (await buttonText.isVisible()) {
             log('Button "View Case Study" is VISIBLE.');
             
             // Analyze Computed Styles of the Button Container (the white pill)
             // Structure: ... > div (white pill) > span > "View Case Study"
             // Closest div with background-color
             const buttonPill = buttonText.locator('xpath=./ancestor::div[contains(@class, "bg-white") or contains(@class, "bg-white/95")]').first();
             
             // Fallback: look for generic parent if class search fails
             const targetElement = (await buttonPill.count() > 0) ? buttonPill : buttonText.locator('..');
             
             const styles = await targetElement.evaluate((el) => {
                 const s = window.getComputedStyle(el);
                 return { bg: s.backgroundColor, color: s.color };
             });
             
             log(`Button Computed BG: ${styles.bg}`);
             log(`Button Computed Text: ${styles.color}`);
             
             // Check Contrast
             // White is rgb(255, 255, 255)
             const isWhite = styles.bg.includes('255, 255, 255');
             const isBlack = styles.color.includes('0, 0, 0') || (styles.color.match(/\d+/g) || []).slice(0,3).every(n => parseInt(n) < 50); // very dark
             
             if (isWhite) log('PASS: Button background is White.');
             else log('FAIL: Button background is NOT White.');
             
             if (isBlack) log('PASS: Button text is Black/Dark.');
             else log('FAIL: Button text is NOT Black.');
             
        } else {
             // If not visible, check opacity
             const opacity = await buttonText.evaluate((el) => window.getComputedStyle(el).opacity);
             log(`Button not marked 'visible' by Playwright. Computed opacity: ${opacity}`);
             log('Potential issue: Hover did not trigger opacity change?');
        }
        
    } else {
        log('FAILED: No Project Cards found with class .group');
    }

  } catch (error) {
    log(`CRITICAL ERROR: ${error.message}`);
    log(error.stack);
  } finally {
    await browser.close();
  }
})();
