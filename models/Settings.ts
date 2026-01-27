import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  isAvailable: boolean;
}

const SettingsSchema: Schema = new Schema({
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Prevent overwrite
const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
