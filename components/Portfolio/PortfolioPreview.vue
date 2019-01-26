<template>
  <b-col cols="12" md="6" lg="4">
    <nuxt-link
      :to="'/portfolio/' + id"
      class="post-preview">
      <article>
        <div
          :style="{backgroundImage: 'url(' + thumbnailImage + ')'}"
          class="post-preview-thumbnail"></div>
        <div class="post-preview-content">
          <h2>{{ title }}</h2>
          <p>{{ excerpt }}</p>
        </div>
        <div class="post-preview-meta">
          <p>Date Published: <time>{{ published }}</time></p>
        </div>
      </article>
    </nuxt-link>
  </b-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    thumbnailImage: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    published: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
html, body  {
  font-family: 'Roboto', sans-serif;
}
a {
  text-decoration: none;
  color: black;
}



.post-preview {
  /* border-radius: 3px; */
  /* box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5); */
  width: 90%;
  min-height: 30rem;
  margin: 1rem;
}

.post-preview-thumbnail {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 10rem;
}

.post-preview-content {
  text-align: center;
  padding: 1rem;
}
.post-preview-content h1 {
  font-weight: 700;
}

.post-preview-meta {
  text-align: center;
  font-size: 14px;
}

@media (min-width: 35rem) {
  .post-preview {
    width: 25rem;
  }
}
</style>

