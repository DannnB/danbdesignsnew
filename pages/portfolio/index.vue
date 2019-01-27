<template>
  <div class="blog">
    <div class="intro">
      <div class="overlay">
        <h1>Portfolio</h1>
      </div>
    </div>
    
    <b-container>
      <b-row>
        <PortfolioPreview
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :excerpt="post.previewText"
          :thumbnailImage="post.thumbnailUrl"
          :id="post.id" />
      </b-row>
    </b-container>

  </div>
</template>

<script>
import PortfolioPreview from "@/components/Portfolio/PortfolioPreview";
import moment from 'moment';

export default {
  head () {
    return {
      title: 'Portfolio',
      meta: [
        { hid: 'description', name: 'description', content: 'A list of projects I have been involved with.'}
      ]
    }
  },

  components: {
    PortfolioPreview
  },
  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories", {
        version: context.isDev ? "draft" : "published",
        starts_with: "portfolio/"
      })
      .then(res => {
        // console.log("Data: ", res.data.stories);
        return {
          posts: res.data.stories.map(bp => {
            return {
              id: bp.slug,
              title: bp.content.title,
              previewText: bp.content.excerpt,
              thumbnailUrl: bp.content.thumbnailImage
            };
          })
        };
      });
    }
  // data() {
  //   return {
  //     posts: [
  //       {
  //         title: "A New Beginning",
  //         previewText: "This will be awesome, don't miss it!",
  //         thumbnailUrl:
  //           "http://www.healthyfood.co.uk/wp-content/uploads/2015/01/Cherry-tomato-bocc-olive-basil-pasta.jpg",
  //         id: "a-new-beginning"
  //       },
  //       {
  //         title: "A Second Beginning",
  //         previewText: "This will be awesome, don't miss it!",
  //         thumbnailUrl:
  //           "http://www.healthyfood.co.uk/wp-content/uploads/2015/01/Cherry-tomato-bocc-olive-basil-pasta.jpg",
  //         id: "a-second-beginning"
  //       }
  //     ]
  //   };
  // }
};
</script>

<style scoped>
#posts {
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 35rem) {
  #posts {
    flex-direction: row;
  }
}
</style>
