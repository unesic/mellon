const shortid = require("shortid");
const { createWriteStream, mkdir } = require("fs");

const Files = require("../../models/Files.model");

const storeUpload = async ({ stream, filename, mimetype }) => {
	const id = shortid.generate();
	const path = `images/${id}-${filename}`;

	return new Promise((resolve, reject) =>
		stream
			.pipe(createWriteStream(path))
			.on("finish", () => resolve({ path, filename, mimetype }))
			.on("error", reject)
	);
};
const processUpload = async (upload) => {
	const { createReadStream, filename, mimetype } = await upload;
	const stream = createReadStream();
	const file = await storeUpload({ stream, filename, mimetype });

	return file;
};

module.exports = {
	Query: {
		getFile: async (_, { fileId }) => {
			try {
				const file = await Files.findById(fileId);
				if (file) {
					return file;
				} else {
					throw new Error("File not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		singleUpload: async (_, { file }) => {
			mkdir("images", { recursive: true }, (err) => {
				if (err) throw err;
			});

			const upload = await processUpload(file);
			const newFile = new Files({ ...upload });
			await newFile.save();

			return newFile;
		},
	},
};
