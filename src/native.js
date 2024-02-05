// Element and Text Tags Definitions

export const ELEMENT_TAGS = {
  A: el => ({ type: 'link', url: el.getAttribute('href') }),
  LI: el => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  UL: () => ({ type: 'bulleted-list' }),
}

export const TEXT_TAGS = {
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  B: () => ({ bold: true }),
  U: () => ({ underline: true }),
}
