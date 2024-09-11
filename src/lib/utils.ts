import { FileWithExtension } from "@/pages/dashboard/createTransaction/type";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// *************** //
// *************** //
// *************** //

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// *************** //
// *************** //
// *************** //

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


// *************** //
// *************** //
// *************** //


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

// *************** //
// *************** //
// *************** //

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


// *************** //
// *************** //
// *************** //

type FileTypeCount = {
    extension: string;
    count: number;
};

type FileCountResult = {
    count: FileTypeCount[];
};

export function getFileExtension(fileName: string): string | null {
    const parts = fileName.split('.');
    if (parts.length < 2) {
        console.warn(`File has no extension: ${fileName}`);
        return null; // or you could throw an error here
    }
    return parts.pop()?.toLowerCase() || null;
}

export function countFileTypes(files: { name: string }[]): FileCountResult {
    const fileCounts: { [key: string]: number } = {};

    files.forEach(file => {
        try {
            const extension = getFileExtension(file.name);
            if (extension) {
                fileCounts[extension] = (fileCounts[extension] || 0) + 1;
            }
        } catch (error) {
            console.error(`Error processing file: ${file.name}`, error);
        }
    });

    const result: FileTypeCount[] = Object.keys(fileCounts).map(extension => ({
        extension,
        count: fileCounts[extension],
    }));

    return { count: result };
}


// *************** //
// *************** //
// *************** //


// Function to update files with key, extension, and url based on the file type/extension
export const updateFilesWithUrls = (files: FileWithExtension[], uploadedFiles: { key: string, extension: string, url: string }[]) => {
    return files.map(fileWithExtension => {
        const matchingUploadedFile = uploadedFiles.find(uploadedFile => 
            uploadedFile.extension === fileWithExtension.file.name.split('.').pop()
        );

        if (matchingUploadedFile) {
            return {
                ...fileWithExtension,
                key: matchingUploadedFile.key,
                extension: matchingUploadedFile.extension,
                url: matchingUploadedFile.url,
            };
        }

        return fileWithExtension;
    });
};


export function formatNumberWithCommas(input: any): any {
    try {
        // Check if the input is a valid number
        if (typeof input !== 'number' || isNaN(input)) {
            throw new Error('Invalid number');
        }

        // Format the number with commas
        return input.toLocaleString('en-US');
    } catch (error) {
        // If any error occurs, return the original input
        return input;
    }
}