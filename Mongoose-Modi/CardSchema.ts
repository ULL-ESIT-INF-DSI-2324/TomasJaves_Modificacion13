import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { Color } from './EColor.js';
import { TipoLinea } from './ETipoLinea.js';
import { Rareza } from './ERareza.js';
import { ICard } from './ICard.js';

const cardSchema = new Schema<ICard>({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  costeMana: { type: Number, required: true },
  color: { type: String, enum: Object.values(Color), required: true},
  líneaTipo: { type: String, enum: Object.values(TipoLinea), required: true},
  rareza : { type: String, enum: Object.values(Rareza), required: true},
  textoReglas: { type: String, required: true },
  fuerzaResistencia: { type: [Number],
    validate: {
      validator: (v: number[]) => v.length === 2,
      message: 'fuerzaResistencia debe ser un array de dos números'
    },
  },
  marcasLealtad: { type: Number },
  valorMercado: { type: Number, required: true },
});

export const Card = mongoose.model<ICard>('Card', cardSchema);