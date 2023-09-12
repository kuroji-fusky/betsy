const consoleHeaderBg = (c: string) =>
  `background-color:${c};color:#f5f5f5;padding:2px 5px;border-radius:4px;font-weight:bold`

export const betsyFeatures = (...i: any[]) =>
  console.debug(
    `%c🔧 BEtsy Features%c`,
    consoleHeaderBg("#166292"),
    "color:currentColor",
    i
  )

export const betsyDebug = (...i: any[]) =>
  console.debug(
    `%c🐞 BEtsy Debug%c`,
    consoleHeaderBg("#f1641e"),
    "color:currentColor",
    i
  )

export const $body = document.body
export const _$ = (
  element: keyof HTMLElementTagNameMap | string,
  target = document
) => {
  return target.querySelector(element)
}

export const _$$ = <E extends Element>(
  element: keyof HTMLElementTagNameMap | string,
  target: E | (Document & Document) = document
) => target.querySelectorAll(element)

export const coerceToString = (input: any): string => {
  if (typeof input === "number") return input.toString()
  if (typeof input === "object") return JSON.stringify(input)
  return input
}

export const appendInlineStyles = (
  target: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) => {
  return Object.entries(styles).forEach(([styleKey, styleValue]) => {
    target.style[styleKey] = styleValue
  })
}
