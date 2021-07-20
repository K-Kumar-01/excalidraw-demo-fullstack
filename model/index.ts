import { Document, Schema, model, models } from 'mongoose';

const imageSchema = new Schema({
  link: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  name: {
    type: String,
    trim: true,
    index: true,
    required: true,
    maxLength: [128, 'File name cannot exceed 128 characters'],
  },
  svgString: {
    type: String,
  },
});

export interface ImageType {
  link: string;
  name: string;
  svgString: string;
}

export interface ImageDocumentType extends ImageType, Document {}

export default models.Image || model('Image', imageSchema);
