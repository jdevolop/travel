'use strict';

const posts = require('../model/Posts');
const u = require('../../../app');


module.exports = {
    async delById(ctx) {
        const { id } = ctx.request.body;

        if (!id) {
            ctx.throw(400, 'post_id required');
        }

		    const exist = await posts.getPostById(parseInt(id));

		    if (!exist.length) {
				    ctx.throw(404, `Post with id(${id}) not found`);
		    }

        const deleted = await posts.deletePostById(parseInt(id));

        if (!deleted) {
		        ctx.throw(400, 'Not deleted');
        }

        ctx.status = 202;
        ctx.body = { message: `Post with id(${id}) deleted` };

    },

		async delByTitle(ctx) {
				const { title } = ctx.params;

				if (!title) {
						ctx.throw(400, 'Title required');
				}

				const exist = await posts.getPostByTitle(title);

				if (!exist.length) {
						ctx.throw(404, `Post with title(${title}) not found`);
				}

				const post = await posts.deletePostByTitle(title);

				if (!post) {
						ctx.throw(404, 'Post Not found');
				}

				ctx.body = { message: `Post with title(${title}) deleted` };
		},

    async add(ctx) {
        const { title, body } = ctx.request.body;

        if (!title || !body) {
		        ctx.throw(400, 'Title and Body required');
        }
		
        const added = await posts.addPost({ title, body });

        if (!added.length) {
            ctx.throw(400, 'Not created');
        }		

        ctx.status = 201;
        ctx.body = { message: 'Post created', id: added[0] };
    },

    async getByTitle(ctx) {
        const { title } = ctx.params;

        if (!title) {
		        ctx.throw(400, 'Title required');
        }

        const post = await posts.getPostByTitle(title);

        if (!post.length) {
            ctx.throw(404, 'Post Not found');
        }

        ctx.body = { data: post };
    },

		async getPosts(ctx) {
    		const allPosts = await posts.getFromPosts();

    		if (!allPosts.length) {
    				ctx.throw(404, 'Posts not found');
		    }

		    ctx.body = {
    				data: allPosts,
		    }
		},

		async updateById(ctx) {
    		const { id } = ctx.params;
    		const { title, body } = ctx.request.body;

    		if (!id || !title || !body) {
    				ctx.throw(400, 'Title and Body required');
		    }

				const exist = await posts.getPostById(parseInt(id));

				if (!exist.length) {
						ctx.throw(404, `Post with id(${id}) not found`);
				}

    		const updated = await posts.updatePostById(parseInt(id), { title, body, updatedAt: new Date() });

    		if (!updated) {
    				ctx.throw(400, 'Not Updated');
		    }

		    ctx.body = { message: `Post with id(${id}) updated` };
		},

		async updateByTitle(ctx) {
				const { old_title } = ctx.params;
				const { title, body } = ctx.request.body;

				if (!old_title || !title || !body) {
						ctx.throw(400, 'Title and Body required');
				}

				const exist = await posts.getPostByTitle(old_title);

				if (!exist.length) {
						ctx.throw(404, `Post with title(${old_title}) not found`);
				}

				const updated = await posts.updatePostByTitle(old_title, { title, body, updatedAt: new Date() });

				if (!updated) {
						ctx.throw(400, 'Not Updated');
				}

				ctx.body = { message: `Post with title(${old_title}) updated to ${title}` };
		}
}
