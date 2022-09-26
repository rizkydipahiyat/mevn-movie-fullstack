<template>
	<v-container>
		<v-row no-gutters>
			<v-col sm="10" class="mx-auto">
				<v-card class="pa-5">
					<v-card-ti>Edit Post</v-card-ti>
					<v-divider></v-divider>
					<v-form
						@submit.prevent="updateForm"
						ref="form"
						class="pa-5"
						enctype="multipart/form-data"
					>
						<v-text-field
							label="Title"
							prepend-icon="mdi-note"
							v-model="post.title"
						></v-text-field>
						<v-text-field
							label="Category"
							prepend-icon="mdi-view-list"
							v-model="post.category"
						></v-text-field>
						<v-textarea
							label="Content"
							prepend-icon="mdi-note-plus"
							v-model="post.content"
						></v-textarea>
						<v-file-input
							@change="selectFile"
							show-size
							counter
							multiple
							label="Select Image"
						></v-file-input>
						<v-img :src="`/${post.image}`" width="120"></v-img>
						<v-btn type="submit" class="mt-3" color="success">Edit Post</v-btn>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { updatePost } from "@/api";
import { getPostById } from "@/api";

export default {
	data() {
		return {
			rules: [(value) => !!value || "This filed is required!"],
			post: {
				title: "",
				category: "",
				content: "",
				image: "",
			},
			image: "",
		};
	},
	async created() {
		const response = await getPostById(this.$route.params.id);
		this.post = response;
	},
	methods: {
		selectFile(file) {
			this.image = file[0];
		},
		async updateForm() {
			const formData = new FormData();
			formData.append("image", this.image);
			formData.append("title", this.post.title);
			formData.append("category", this.post.category);
			formData.append("content", this.post.content);
			formData.append("old_image", this.post.image);
			if (this.$refs.form.validate()) {
				const response = await updatePost(this.$route.params.id, formData);
				this.$router.push({ name: "home", params: { msg: response.msg } });
			}
		},
	},
};
</script>
