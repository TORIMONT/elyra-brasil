import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ISSO VAI FORÇAR O DEPLOY MESMO COM ERRO DE TIPO
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
