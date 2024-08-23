import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function replacePathSegment(url: string, newSegment: string): string {
    // Use URL constructor to parse the input URL
    const parsedUrl = new URL(url);

    // Split the pathname into segments
    const pathSegments = parsedUrl.pathname.split('/');

    // Replace the segment between the first and second slash
    if (pathSegments.length > 1) {
        pathSegments[1] = newSegment;
    }

    // Join the segments back into a pathname
    parsedUrl.pathname = pathSegments.join('/');

    // Return the modified URL as a string
    return parsedUrl.toString();
}

export function blobToDataUrl(blob: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				// Assert that reader.result is a string
				if (typeof reader.result === "string") {
					resolve(reader.result);
				} else {
					reject(new Error("FileReader did not return a string."));
				}
			};
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(blob);
		});
}

/**
 * Truncates a string and adds ellipsis in the middle.
 *
 * @param {string} str - The input string to truncate.
 * @param {number} startChars - The number of characters to keep from the start of the string.
 * @param {number} [endChars=3] - The number of characters to keep from the end of the string. Default is 3.
 * @returns {string} The truncated string with ellipsis in the middle.
 */
export const addEllipsis = (str: string | undefined | null, startChars: number, endChars = 3): string => {
  if (!str) {
    return "";
  }
	if (str.length <= startChars + endChars) {
		return str;
	}

	const start = str.slice(0, startChars);
	const end = str.slice(-endChars);

	return `${start}...${end}`;
};