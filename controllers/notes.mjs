import List from "../models/List.mjs";
import Note from "../models/Note.mjs";

const getAllNotes = async (req, res) => {
	try {
		const allNotes = await Note.find({ user: req.user.id });
		return res.status(200).json({ allNotes: allNotes });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const getAllLists = async (req, res) => {
	try {
		const lists = await List.find({ user: req.user.id });
		return res.status(200).json({ lists: lists });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const getList = async (req, res) => {
	try {
		const list = await List.findById(req.params.id);
		if (!list) return res.status(404).json({ message: "List not found" });
		if (list.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		return res.status(200).json({ list: list });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const createList = async (req, res) => {
	try {
		const { title, color, description } = req.body;
		if (!title) return res.status(400).json({ message: "Invalid Data" });
		const newList = new List({
			user: req.user.id,
			title,
			color,
			description,
		});
		const list = await newList.save();
		return res.status(201).json({ list: list });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const getNote = async (req, res) => {
	const id = req.params.id;
	try {
		const foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		return res.status(200).json(foundNote);
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const addNote = async (req, res) => {
	const { title, content, color, image, archived } = req.body;
	if (!title || !content || !color)
		return res.status(400).json({ message: "Invalid Data" });
	try {
		const newNote = new Note({
			user: req.user.id,
			title,
			content,
			color,
			image,
			archived,
		});
		const note = await newNote.save();
		return res
			.status(200)
			.json({ newNote: note, message: "Added note successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const editNote = async (req, res) => {
	const id = req.params.id;
	try {
		const { ...updatedFields } = req.body;
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);
		return res.status(200).json({
			updatedNote: updatedNote,
			message: "Updated note successfully",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const addNoteToList = async (req, res) => {
	const { noteId } = req.body;
	const listId = req.params.id;
	try {
		const list = await List.findById(listId);
		if (!list) return res.status(404).json({ message: "List not found" });
		if (list.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		console.log(12);
		const note = await Note.findById(noteId);
		if (!note) return res.status(404).json({ message: "Note not found" });
		if (note.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		console.log(23);
		if (list.notes.includes(noteId))
			return res.status(400).json({ message: "Note already in list" });
		list.notes.push(noteId);
		await list.save();
		return res.status(200).json({ message: "Added note to list" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const archiveNote = async (req, res) => {
	const id = req.params.id;
	try {
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundNote.trashed)
			return res
				.status(400)
				.json({ message: "Cannot archive a trashed note" });
		if (foundNote.archived)
			return res.status(400).json({ message: "Note already archived" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				$set: { archived: true },
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ updatedNote: updatedNote, message: "Note archived" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const unArchiveNote = async (req, res) => {
	const id = req.params.id;
	try {
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundNote.trashed)
			return res
				.status(400)
				.json({ message: "Cannot unarchive a trashed note" });
		if (!foundNote.archived)
			return res
				.status(400)
				.json({ message: "Note not found in archives" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				$set: { archived: false },
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ updatedNote: updatedNote, message: "Note unarchived" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const moveNoteToTrash = async (req, res) => {
	const id = req.params.id;
	try {
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (foundNote.trashed)
			return res.status(400).json({ message: "Note already in trash" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				$set: { trashed: true },
			},
			{ new: true }
		);
		return res
			.status(200)
			.json({ updatedNote: updatedNote, message: "Note moved to Trash" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const restoreNoteFromTrash = async (req, res) => {
	const id = req.params.id;
	try {
		let foundNote = await Note.findById(id);
		if (!foundNote)
			return res.status(404).json({ message: "Note not found" });
		if (foundNote.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		if (!foundNote.trashed)
			return res.status(400).json({ message: "Note not in trash" });
		let updatedNote = await Note.findByIdAndUpdate(
			id,
			{
				$set: { trashed: false },
			},
			{ new: true }
		);
		return res.status(200).json({
			updatedNote: updatedNote,
			message: "Note restored",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Note not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

const deleteNote = async (req, res) => {
	const id = req.params.id;
	try {
		const note = await Note.findById(id);
		if (!note) return res.status(404).json({ message: "Note not found" });
		if (note.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		await note.remove();
		return res.status(200).json({ message: "Note deleted" });
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Noet not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

export {
	getAllNotes,
	getAllLists,
	getList,
	getNote,
	createList,
	addNoteToList,
	addNote,
	editNote,
	archiveNote,
	unArchiveNote,
	moveNoteToTrash,
	restoreNoteFromTrash,
	deleteNote,
};
