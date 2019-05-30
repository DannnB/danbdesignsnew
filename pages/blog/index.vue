<template>
  <div class="section blog normal-page">    
    <b-container>
      <b-row>
        <b-col>
          <h1>Blog</h1>
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

export default {
  head () {
    return {
      title: 'Blog',
      meta: [
        { hid: 'description', name: 'description', content: 'Articles about everything I like.'}
      ]
    }
  },

  components: {
    PostPreview
  },
  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories", {
        version: context.isDev ? "draft" : "published",
        starts_with: "blog/"
      })
      .then(res => {
        // console.log("Data: ", res.data.stories);
        return {
          posts: res.data.stories.map(bp => {
            return {
              id: bp.slug,
              title: bp.content.title,
              previewText: bp.content.excerpt,
              thumbnailUrl: bp.content.thumbnailImage,
              published: 
                moment(bp.published_at)
                .format('DD/MM/YY h:mm a')   
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
