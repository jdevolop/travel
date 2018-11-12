'use strict';

const dao = require('../../conf/Base');


class Posts {

    constructor() {
        this.table = 'Posts'
    }

    async createPostsTable() {
		let exist = await dao.knex.schema.withSchema('public').hasTable(this.table);

        if (!exist) {
            await dao.knex.schema.withSchema('public').createTable(this.table, (t) => {
                t.increments('id');
                t.string('title', 20);
                t.text('body');
                t.string('image');
                t.timestamp('createdAt').defaultTo(dao.knex.fn.now());
				t.timestamp('updatedAt');
            });

            console.log(`${this.table} created`);
        } else {
            console.error(`${this.table} is already created`);
        }
    }

    async addPost({ title, body }) {
        const id = await dao.knex
            .returning('id')
            .insert({ title, body })
            .from(this.table);

        return id;
    }

    async updatePostById(id, { title, body,  updatedAt }) {
        await dao.knex
            .update({ title, body, updatedAt })
            .from(this.table)
            .where({ id });

        return true;
    }

    async updatePostByTitle(tit, { title, body,  updatedAt }) {
        await dao.knex
            .update({ title, body,  updatedAt })
            .from(this.table)
            .where( 'title', tit );

		    return true;
    }

    async deletePostById(id) {
				await dao.knex
						.select()
						.from(this.table)
						.where({ id })
						.del();

				return true;
		}

		async deletePostByTitle(title) {
				await dao.knex
						.select()
						.from(this.table)
						.where({ title })
						.del();

				return true;
		}

    async getFromPosts() {
        const data = await dao.knex
            .select('title', 'body', 'image', 'id')
            .from(this.table);

        return data;
    }

    async getPostById(id) {
        const post = await dao.knex
                        .select('title', 'body', 'image', 'id')
                        .from(this.table)
                        .where({ id });

        return post;
    }

    async getPostByTitle(title) {
        const post = await dao.knex
                        .select('title', 'body', 'image', 'id')
                        .from(this.table)
                        .where({ title });

        return post;
    }
    async updateImage(id, image) {
        await dao.knex
            .update({ image })
            .from(this.table)
            .where({ id });

        return true;    
    }
}

const posts = new Posts();


module.exports = posts;
