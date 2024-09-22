import Image from "next/image";
import { Inter } from "next/font/google";
import App from './app';
import { RecoilRoot } from 'recoil';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
