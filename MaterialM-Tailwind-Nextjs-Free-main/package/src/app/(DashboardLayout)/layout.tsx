"use client";
import React from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex w-full min-h-screen">
        <div className="page-wrapper flex w-full">
          {/* Header/sidebar */}
          <Sidebar />
          <div className="body-wrapper w-full bg-lightgray dark:bg-dark">
            <Header />
            {/* Body Content  */}
            <div
              className={`container px-4 py-12`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
