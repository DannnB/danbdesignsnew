<template>
  <!-- <div id="post" v-editable="blok"> -->
  <div id="post">
    <div class="intro" :style="{backgroundImage: 'url(' + image + ')'}">
      <div class="overlay">
        <h1>{{ title }}</h1>
      </div>
    </div>
    <section class="section post-content">
      <!-- <ul class="tag-list">
        <li v-for="tag in tag_list" :key="tag">
          {{ tag }}
        </li>
      </ul>
      <p>{{ published }}</p>
      <hr> -->
      <a href="/portfolio" title="Back to the portfolio page">&lsaquo; Back to portfolio</a>
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
      .get("cdn/stories/portfolio/" + context.params.postId, {
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
          res: res.data,
          tag_list: res.data.story.tag_list
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

.tag-list {
  padding: 0;
  margin: 20px 0;
}

.tag-list li {
  list-style: none;
  display: inline-block;
  padding: 5px 10px;
  background-color: #00586b;
  color: #ffffff;
  margin: 5px 4px;
}
.post-content {
  width: 80%;
  max-width: 500px;
  margin: auto;
}

.post-content p {
  white-space: pre-line;
}

.post-content img {
  width: 100%;
}

.post-content a {
  display: block;
  color: #545454;
  margin: 0 0 30px 0;
  font-size: 1.2rem;
}
.post-content a:hover {
  text-decoration: none;
  color: black;
}
</style>

