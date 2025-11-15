import exifr from "exifr";
import FastGlob from "fast-glob";

/**
 * @param {import('@11ty/eleventy/UserConfig').default} eleventyConfig
 */
export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.addPassthroughCopy("src/rollen/*.JPEG");
	eleventyConfig.addCollection("rollen", async () => {
		const rollenImagePaths = await FastGlob("rollen/*.JPEG", {
			cwd: "src",
		});

		const collectionData = (
			await Promise.all(
				rollenImagePaths.map(async (path) => {
					const exif = await exifr.parse(`src/${path}`);
					return {
						path,
						takenAt: exif["DateTimeOriginal"],
					};
				}),
			)
		).sort((a, b) => {
			return b.takenAt - a.takenAt;
		});

		return collectionData;
	});
}
