import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Determines the appropriate text color (light or dark) based on the background color
 * to ensure proper contrast and readability
 * @param backgroundColor - CSS color string (hex, rgb, etc.)
 * @param lightColor - The color to use on dark backgrounds (default: white)
 * @param darkColor - The color to use on light backgrounds (default: black)
 * @returns The appropriate contrast color
 * @example getContrastColor("#000000") // "white"
 * @example getContrastColor("rgb(255, 255, 255)") // "black"
 */
export function getContrastColor(
  backgroundColor: string,
  lightColor: string = "white",
  darkColor: string = "black"
): string {
  // Convert the color to RGB if it's in hex format
  let r = 0,
    g = 0,
    b = 0;

  // Handle hex colors
  if (backgroundColor.startsWith("#")) {
    const hex = backgroundColor.slice(1);

    // Handle shorthand hex (#RGB)
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    }
    // Handle standard hex (#RRGGBB)
    else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
  }
  // Handle rgb/rgba colors
  else if (backgroundColor.startsWith("rgb")) {
    const rgbMatch = backgroundColor.match(/\d+/g);
    if (rgbMatch && rgbMatch.length >= 3) {
      r = parseInt(rgbMatch[0], 10);
      g = parseInt(rgbMatch[1], 10);
      b = parseInt(rgbMatch[2], 10);
    }
  }

  // Calculate relative luminance using the perceived brightness formula
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return light color for dark backgrounds, dark color for light backgrounds
  return luminance > 0.5 ? darkColor : lightColor;
}

/**
 * Функция для правильного склонения слов после числительных в русском языке
 * @param count - число элементов
 * @param forms - массив из трех форм слова: для 1, для 2-4, для 5-20
 * @example pluralize(1, ['коин', 'коина', 'коинов']) // "1 коин"
 * @example pluralize(2, ['коин', 'коина', 'коинов']) // "2 коина"
 * @example pluralize(5, ['коин', 'коина', 'коинов']) // "5 коинов"
 */
export function pluralize(count: number, forms: [string, string, string]): string {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;

  // Особые случаи для чисел, оканчивающихся на 11-19
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} ${forms[2]}`;
  }

  // Для чисел, оканчивающихся на 1 (кроме 11, 111, и т.д.)
  if (lastDigit === 1) {
    return `${count} ${forms[0]}`;
  }

  // Для чисел, оканчивающихся на 2, 3, 4 (кроме 12, 13, 14, и т.д.)
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} ${forms[1]}`;
  }

  // Для всех остальных случаев (0, 5-9, 11-19, и т.д.)
  return `${count} ${forms[2]}`;
}
