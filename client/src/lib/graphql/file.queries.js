import gql from "graphql-tag";

const GET_FILE = gql`
	query getFile($fileId: ID!) {
		getFile(fileId: $fileId) {
			id
			filename
			mimetype
			path
		}
	}
`;

const FILE_UPLOAD = gql`
	mutation singleUpload($file: Upload!) {
		singleUpload(file: $file) {
			id
			filename
			mimetype
			path
		}
	}
`;

export { GET_FILE, FILE_UPLOAD };
