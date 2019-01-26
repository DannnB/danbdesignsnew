<template>
  <div class="home">
    <div class="intro">
      <div class="overlay">
        <b-container class="large">
          <h1>DanB - Frontend Engineer</h1>
          <p>I am a web developer &amp; designer from Worcester, UK.</p>
        </b-container>
      </div>
    </div>

    <b-container>
      <b-row class="blog-header">
        <b-col>
          <h2>Blog</h2>
        </b-col>
      </b-row>
      <b-row>
        <PostPreview
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :excerpt="post.previewText"
          :thumbnailImage="post.thumbnailUrl"
          :id="post.id" 
          :published="post.published"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PostPreview from "@/components/Blog/PostPreview";
import moment from 'moment';
import 'babel-polyfill';

export default {
  components: {
    PostPreview
  },
  // asyncData(context) {
  //   return context.app.$storyapi
  //     .get("cdn/stories", {
  //       version: context.isDev ? "draft" : "published",
  //       starts_with: "home"
  //     })
  //     .then(res => {
  //       return {
  //         page: res.data.stories.map(bp => {
  //           return {
  //             id: bp.slug,
  //             title: bp.content.title,
  //             subtitle: bp.content.subtitle
  //           };
  //         })
  //       };
  //     });
  // },
  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories", {
        version: context.isDev ? "draft" : "published",
        starts_with: "blog/"
      })
      .then(res => {
        return {
          posts: res.data.stories.map(bp => {
            return {
              id: bp.slug,
              title: bp.content.title,
              previewText: bp.content.excerpt,
              thumbnailUrl: bp.content.thumbnailImage,
              published: moment(bp.published_at)
                .format('DD/MM/YY h:mm a')  
            };
          })
        };
      });
  }
};
</script>

<style>
/* #posts {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
} */

/* @media (min-width: 35rem) {
  #posts {
    flex-direction: row;
  }
} */
</style>
