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