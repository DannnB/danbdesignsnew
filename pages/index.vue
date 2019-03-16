<template>
  <div class="home">
    <div class="intro">
      <div class="overlay">
        <b-container class="large">
          <h1>DanB - Frontend Engineer</h1>
          <p class="banner_content">A web developer &amp; designer from Worcester, UK. Currently working for <a href="https://www.morgan-motor.co.uk" rel="nofollow" target="_blank" alt="View the Morgan Motor Company website">Morgan Motor Company</a></p>
        </b-container>
      </div>
    </div>
    <div class="section grey">
      <b-container>
        <b-row>
          <b-col>
            <h2>Currently looking for freelance work so please message me with your projects!</h2>
            <p class="intro-content">Highly experienced and creative web engineer. With a keen interest in technology, mobile applications and user experience. Being self-taught I take authority of my own personal development. This means I regularly update my skills and enjoy a challenge. This has allowed me to accomplish a strong background in JavaScript (Frontend/Backend), HTML, CSS(SCSS), Accessibility and SEO practices. Passionate about all things digital, clean reusable code and developing the best services and products.</p>
          </b-col>
        </b-row>
      </b-container>
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
      <b-row>
        <nuxt-link to="/blog" class="btn-primary">See more</nuxt-link>
      </b-row>
    </b-container>
    
    <div class="section grey">
      <b-container>
        <b-row class="blog-header">
          <b-col>
            <h2>Recommendations</h2>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <blockquote>
              Dan has great level of knowledge when it comes to front end &amp; back end development which he continues to build on. He is confident in meetings and communicates well with clients and co-workers. Dan is a team player Friendly and helpful and always willing to go the extra mile whenever I was working on a project with him. Off his own back Dan did a large amount of research into advanced analytics and SEO. I would not hesitate to recommend Dan.
              <cite>Emma Hamilton - Director</cite>
            </blockquote>
          </b-col>
          <b-col cols="12">
            <blockquote>
              I had the pleasure of managing and working with Dan for close to two years during my time at Citizen and Native. In that time, I've seen him not only excel at the core elements of his role as a front-end developer, but also learn other skills that extend beyond the scope of his role, into back-end development. In order to not only widen his knowledge but offer continuous support to his colleagues. No matter what was thrown at Dan, he would always go above and beyond to solve any problem, leaving no stone unturned, a clear drive and determination to give his all. A big team player, offering his valuable opinion on project work, aiding us to produce our best work. I saw Dan take huge strides since his first day at Citizen, developing into a knowledgeable, proactive all-round developer who makes an instant impact on any project. I would highly recommend Dan as an extremely talented individual.
              <cite>Philip Pountney - Full Stack Digital Designer</cite>
            </blockquote>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import PostPreview from "@/components/Blog/PostPreview";
import PortfolioPreview from "@/components/Blog/PostPreview";

import moment from 'moment';
import 'babel-polyfill';

import axios from 'axios'

export default {
  components: {
    PostPreview,
    PortfolioPreview
  },
  // async asyncData({ query, error }) {
  //   let [pageRes, countRes] = await Promise.all([
  //     axios.get('/api/post/page/0'),
  //     axios.get('/api/post/count/published'),
  //   ])
  //   return {
  //      posts: pageRes.data.list,
  //      total: countRes.data.result
  //   }
  // },
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
  // asyncData(context) {
  //   return context.app.$storyapi
  //     .get("cdn/stories", {
  //       version: context.isDev ? "published" : "published"
  //     })
  //     .then(res => {
  //       console.clear();
  //       // console.log(res.data.stories);
  //       return {
  //         // content: res.data.stories.map(content => {            
  //         //   return {
  //         //     content: content.slug
  //         //   }
  //         // })
          
  //         posts: res.data.stories.map(bp => {
  //           return {
  //             id: bp.slug,
  //             title: bp.content.title,
  //             previewText: bp.content.excerpt,
  //             thumbnailUrl: bp.content.thumbnailImage,
  //             published: moment(bp.published_at)
  //               .format('DD/MM/YY h:mm a')  
  //           };
  //         })
  //       };
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};
</script>

<style>
blockquote {
  border-left: 4px solid #424242;
  padding: 0 0 0 30px;
  margin-bottom: 40px;
}
blockquote cite {
  font-weight: bold;
  margin-top: 20px;
  display: inline-block;
}
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
