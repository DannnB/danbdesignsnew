<template>
  <section id="about-page">
    <div class="section__banner" 
    :style="{ backgroundImage: `url(${page[0].banner})`}"></div>
    <div class="section">
      <div class="section__container">
          <h1>{{ page[0].title }}</h1>
          <div v-html="page[0].content"></div>
      </div>
    </div>
    <div class="section section--dark">
      <div class="section__container">
          <h1>{{ page[0].title }}</h1>
          <div v-html="page[0].content"></div>
      </div>
    </div>
  </section>
</template>

<script>
const marked = require("marked");

marked.setOptions({
  renderer: new marked.Renderer(),
  headerIds: false,
  sanitize: true
});

export default {
  data() {
    return {
      banner: ''
    }
  },
  computed: {
    styles() {
      return {
        'background-image': `url(${this.page[0].banner})`
      }
    }
  },
  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories/about", {
        version: context.isDev ? "draft" : "published"
      })
      .then(res => {
        return {
          page: res.data.story.content.body.map(bp => {
            // console.log(res.data.story.content.body)
          // console.log(res.data.story.content.body[0]['title'])
              // console.log("bp: ", bp.content);
            return {
              title: bp.title,
              content: marked(bp.content),
              banner: 'https://placehold.it/1920x400'
            };
          })
          // blok: res.data.story.content,
          // title: res.data.story.content.body.title,
          // content: res.data.story.content.body.content
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
.section {
  width: 100%;
  margin: 50px 0;
  padding: 50px 0;
}
.section__container {
  width: 100%;
  max-width: 500px;
  margin: auto;
}
.section--dark {
  background-color:#022d30;
  color: white;
}
.section__banner {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  width: 100%;
}

#about-page p {
  white-space: pre-line;
}
</style>

