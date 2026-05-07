import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    { name: 'eyebrow', label: 'Sopra-titolo', type: 'text' },
    { name: 'heading', label: 'Titolo', type: 'text', required: true },
    { name: 'subheading', label: 'Sottotitolo', type: 'textarea' },
    {
      name: 'image',
      label: 'Immagine di sfondo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'cta',
      label: 'Pulsanti',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'label', label: 'Etichetta', type: 'text', required: true },
        { name: 'href', label: 'Link', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primario', value: 'primary' },
            { label: 'Secondario', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}

export const TextSection: Block = {
  slug: 'textSection',
  labels: { singular: 'Sezione testo', plural: 'Sezioni testo' },
  fields: [
    { name: 'heading', label: 'Titolo', type: 'text' },
    { name: 'body', label: 'Contenuto', type: 'richText', required: true },
    {
      name: 'align',
      label: 'Allineamento',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Sinistra', value: 'left' },
        { label: 'Centrato', value: 'center' },
      ],
    },
  ],
}

export const ImageGrid: Block = {
  slug: 'imageGrid',
  labels: { singular: 'Griglia immagini', plural: 'Griglie immagini' },
  fields: [
    { name: 'heading', label: 'Titolo', type: 'text' },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}

export const CTA: Block = {
  slug: 'cta',
  labels: { singular: 'Call to action', plural: 'Call to action' },
  fields: [
    { name: 'heading', label: 'Titolo', type: 'text', required: true },
    { name: 'description', label: 'Descrizione', type: 'textarea' },
    { name: 'buttonLabel', label: 'Etichetta pulsante', type: 'text', required: true },
    { name: 'buttonHref', label: 'Link', type: 'text', required: true },
  ],
}

export const FAQ: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  fields: [
    { name: 'heading', label: 'Titolo', type: 'text', defaultValue: 'Domande frequenti' },
    {
      name: 'items',
      label: 'Domande',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', label: 'Domanda', type: 'text', required: true },
        { name: 'answer', label: 'Risposta', type: 'richText', required: true },
      ],
    },
  ],
}

export const Testimonials: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonianze', plural: 'Testimonianze' },
  fields: [
    { name: 'heading', label: 'Titolo', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'author', label: 'Autore', type: 'text', required: true },
        { name: 'role', label: 'Ruolo / contesto', type: 'text' },
        { name: 'quote', label: 'Testimonianza', type: 'textarea', required: true },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
}

export const pageBlocks = [Hero, TextSection, ImageGrid, CTA, FAQ, Testimonials]
