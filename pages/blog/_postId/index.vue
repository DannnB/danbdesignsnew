<template>
  <!-- <div id="post" v-editable="blok"> -->
  <div id="post">
      <pre>{{ res }}</pre>
    <div class="intro" :style="{backgroundImage: 'url(' + image + ')'}">
      <div class="overlay">
        <h1>{{ title }}</h1>
      </div>
    </div>
    <section class="post-content">
      <p>{{ published }}</p>
      <hr>
      <div v-html="content"></div>
    </section>
  </div>
</template>

<script>
// get markdown editor
const marked = require("marked");

export default {
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description}
      ]
    }
  },

  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories/blog/" + context.params.postId, {
        version: process.env.NODE_ENV == "production" ? "published" : "draft"
      })
      .then(res => {
        return {
          id: res.data.story.slug,
          // title: res.data.story.content.title,
          previewText: res.data.story.content.excerpt,
          thumbnailUrl: res.data.story.content.thumbnailImage,
          published: res.data.story.content.published_at,

          // blok: res.data.story.content,
          image: res.data.story.content.thumbnailImage,
          title: res.data.story.content.title,
          content: marked(res.data.story.content.content),
          description: res.data.story.content.description,
          res: res.data
        };
      });
  },
  mounted() {
    this.$storyblok.init();
    this.$storyblok.on("change", () => {
      location.reload(true);
    });
  }
};
</script>

<style>

.post-content {
  width: 80%;
  max-width: 500px;
  margin: auto;
}

.post-content p {
  white-space: pre-line;
}
</style>

