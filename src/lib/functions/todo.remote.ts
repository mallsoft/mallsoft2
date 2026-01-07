import { command, form, getRequestEvent, query } from '$app/server';
import { todoQueries } from '$lib/server/db/queries';
import { error, redirect } from '@sveltejs/kit';
import * as v from 'valibot';
import type { Cookies } from '@sveltejs/kit';

const MAX_LISTS = 100;
const TODO_COOKIE_KEY = 'lists';
const TODO_COOKIE_OPTS = {
	path: '/',
	maxAge: 60 * 60 * 24 * 365
};

const ListsCookieSchema = v.pipe(
	v.record(v.pipe(v.string(), v.uuid()), v.string()),
	v.maxEntries(MAX_LISTS)
);

const parseAndValidateListsCookie = (raw: string) => {
	let parsed: unknown;
	try {
		parsed = JSON.parse(raw);
	} catch (err) {
		console.error('JSON parse failed', err);
		return {};
	}

	try {
		const result = v.safeParse(ListsCookieSchema, parsed);
		return result.success ? result.output : {};
	} catch {
		console.error('Malformed list error');
		return {};
	}
};

const cookieData = {
	setList: (
		cookies: Cookies,
		{ listId, listName }: { listId: string; listName: string },
		forgetItem: boolean = false
	) => {
		const data = cookies.get(TODO_COOKIE_KEY);

		const lists = data ? parseAndValidateListsCookie(data) : {};

		if (forgetItem) {
			delete lists[listId];
		} else {
			lists[listId] = listName;
		}

		cookies.set(TODO_COOKIE_KEY, JSON.stringify(lists), TODO_COOKIE_OPTS);
	},
	getList: (
		cookies: Cookies
	): ReturnType<typeof parseAndValidateListsCookie> => {
		const data = cookies.get(TODO_COOKIE_KEY);

		if (!data) return {};

		return parseAndValidateListsCookie(data);
	}
};

// =============== LIST ============

export const createTodoList = form(
	v.object({
		todoName: v.pipe(v.string(), v.minLength(1), v.maxLength(100))
	}),
	async ({ todoName }) => {
		const res = await todoQueries.createList(todoName);
		redirect(303, `/todo/${res.id}`);
	}
);

export const getKnownLists = query(() => {
	const ev = getRequestEvent();
	const list = cookieData.getList(ev.cookies);
	return list;
});

export const memorizeList = command(
	v.object({
		listName: v.string(),
		listId: v.pipe(v.string(), v.uuid())
	}),
	({ listId, listName }) => {
		const ev = getRequestEvent();
		cookieData.setList(ev.cookies, { listId, listName });
	}
);

export const forgetList = form(
	v.object({
		listId: v.pipe(v.string(), v.uuid())
	}),
	({ listId }) => {
		const ev = getRequestEvent();
		cookieData.setList(ev.cookies, { listId, listName: '' }, true);
	}
);

export const deleteList = form(
	v.object({
		listId: v.pipe(v.string(), v.uuid())
	}),
	async ({ listId }) => {
		const ev = getRequestEvent();
		// also forget...
		cookieData.setList(ev.cookies, { listId, listName: '' }, true);

		await todoQueries.deleteList(listId);
		return redirect(303, '/todo');
	}
);

// =============== LIST ITEMS ============

export const getTodoListName = query(
	v.object({
		listId: v.pipe(v.string(), v.uuid())
	}),
	async ({ listId }) => {
		const res = await todoQueries.getListName(listId);
		if (!res) {
			error(404, 'Not found');
		}

		return res;
	}
);

export const getTodoListItems = query(
	v.object({
		listId: v.pipe(v.string(), v.uuid())
	}),
	async ({ listId }) => {
		return await todoQueries.getItems(listId);
	}
);

export const createListItem = form(
	v.object({
		item: v.string(),
		listId: v.pipe(v.string(), v.uuid())
	}),
	async ({ item, listId }) => {
		return await todoQueries.createItem(listId, item);
	}
);

export const deleteListItem = form(
	v.object({
		listId: v.pipe(v.string(), v.uuid())
	}),
	async ({ listId }) => {
		return await todoQueries.deleteItem(listId);
	}
);
