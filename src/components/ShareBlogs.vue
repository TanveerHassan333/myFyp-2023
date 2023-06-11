<template>
    <div class="container top-bar">
      <h1>Share Blog</h1>
    </div>
    <div class="container editor-container">
      <QuillEditor
        theme="snow"
        v-model="editorContent" ref="quillEditor"
        :options="editorOptions"></QuillEditor>
      <button class="share" @click="submitBlog">
        Share Blog
      </button>
      <p class="success-msg" v-if="showSuccessMessage">Blog shared successfully!</p>
    </div>
  </template>
  
  <script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/init'

const editorOptions = {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
      },
    };
    export default {
  name: 'ShareBlog',
  data() {
    return {
      editorContent: '', // Holds the blog content
      showSuccessMessage: false,
      editorOptions,
    };
  },
  methods: {
    async submitBlog() {
      // Get the blog content from the Quill editor
      const delta = this.$refs.quillEditor.getContents();
      const contentArray = delta.ops.map(op => op.insert);
      const content = contentArray.map(item => {
    if (typeof item === 'string') {
      return item;
    }
    return item.insert;
  }).join('').trim();
      try {
        const blogData = {
          content: delta.ops.map(op => op.insert),
          // Other data fields you want to save
          
        };
        console.log(blogData.content[0])

        const docRef = await addDoc(collection(db, 'blogs'),blogData);
        // console.log('Document written with ID: ', docRef.id);
        this.blogData = ''
        this.showSuccessMessage = true;
        this.editorContent = ''; // Clear the editor content after submission
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  },
  };

  
</script>
  
  <style scoped>
  .container {
    margin: 1rem auto;
  }
  
  .top-bar h1 {
    font-size: 1.3rem;
    font-weight: bold;
    color: #333;
  }
  
  .editor-container {
    height: 18rem;
    margin-top: 3rem;
    margin: 0 auto;
  }
  
  .share {
    margin-top: 1rem;
    background-color: #ffdc5f;
    border: none;
    border-radius: 1.2rem;
    padding: 0.7rem 1.3rem;
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
  }
  .success-msg{
    background-color: lightgreen;
    border-radius: 1rem;
    width: fit-content;
    padding: 0.4rem;
    color: white;
  }
  </style>
  