<template>
    <b-row>
        <PortfolioPreview
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          :excerpt="post.previewText"
          :thumbnailImage="post.thumbnailUrl"
          :id="post.id" 
          :published="post.published"/>
      </b-row>
</template>

<script>
import PortfolioPreview from '@/components/Portfolio/PortfolioPreview'

export default {
    components: {
        PortfolioPreview
    },
    data() {
      return {
        posts: [1,2,3,4]
      }
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
              thumbnailUrl: bp.content.thumbnailImage,
              published: 
                moment(bp.published_at)
                .format('DD/MM/YY h:mm a')   
            };
          })
        };
      });
  }
}
</script>

