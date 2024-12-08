"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import image1 from "@/app/assets/animate.gif";
import Image from "next/image";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [websites, setWebsites] = useState([]); // State for websites
  const [blogs, setBlogs] = useState([]); // State for blogs

  async function searchWeb(searchQuery: string) {
    try {
      const response = await axios.post("/api/website", {
        query: searchQuery,
      });
      setWebsites(response.data); // Update websites state
      console.log("Websites:", response.data);
    } catch (error) {
      console.error("Error fetching websites:", error);
    }
  }

  async function searchBlog(searchQuery: string) {
    try {
      const response = await axios.post("/api/blog", {
        query: searchQuery,
      });
      setBlogs(response.data.blogResults); // Update blogs state
      console.log("Blogs:", response.data.blogResults);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      await Promise.all([searchWeb(searchQuery), searchBlog(searchQuery)]);
      setSearchQuery("");
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen ">
      <form
        onSubmit={handleFormSubmit}
        className="w-full  h-12 flex items-center justify-center gap-5"
      >
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-2 h-10 text-lg outline-none rounded-md text-md w-[50vw]"
          />
        </label>
        <Button type="submit" className="text-lg p-5">
          Search
        </Button>
      </form>
      <div className="w-full p-4  mt-2">
        {loading ? (
          <div className="w-full h-full bg-green-500 flex items-center justify-center bg-opacity-30">
            <div className="card w-[40vw] rounded-lg h-[25vw] bg-white flex items-center justify-center">
              <Image
                src={image1}
                className="w-full h-full object-contain"
                alt="loader"
              />
            </div>
          </div>
        ) : (
          <Tabs defaultValue="blog" className="w-full">
            <TabsList>
              <TabsTrigger value="blog">Blogs</TabsTrigger>
              <TabsTrigger value="website">Websites</TabsTrigger>
            </TabsList>
            <TabsContent value="blog">
              <div className="grid grid-cols-1 gap-4">
                {blogs.map((item: any, index: number) => (
                  <div key={index} className="p-4 bg-white rounded-md">
                    <h3 className="font-bold">{item.title}</h3>
                    <p>{item.description || "No description available"}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      Visit Blog
                    </a>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="website">
              <div className="grid grid-cols-1 gap-4">
                {websites.map((item: any, index: number) => (
                  <div key={index} className="p-4 bg-white rounded-md">
                    <h3 className="font-bold">{item.title}</h3>
                    <p>{item.description || "No description available"}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      Visit Website
                    </a>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

export default Page;
