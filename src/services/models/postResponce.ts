/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * ThinkEasy
 * Test Task BE
 * OpenAPI spec version: 1.0
 */
import type { PostResponceAuthor } from "./postResponceAuthor";
import type { PostResponceContent } from "./postResponceContent";

export interface PostResponce {
  author: PostResponceAuthor;
  content: PostResponceContent;
  published: boolean;
  title: string;
}
