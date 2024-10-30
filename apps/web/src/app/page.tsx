import { AnimatedText } from "@/components/animated-text";
import { CopyText } from "@stratokit/ui/copy-text";
import RetroGrid from "@stratokit/ui/retro-grid";

export const runtime = "edge";

export default function Page() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute -z-50 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#6a3dda_100%)]" />

      <h1 className="font-departure font-bold text-[40px] md:text-[84px] relative z-10 text-center h-[120px] md:h-auto leading-tight">
        <AnimatedText text="Launch your SaaS for free" />
      </h1>

      <p className="relative z-10 text-center text-lg max-w-[80%] mt-0 md:mt-4">
        An open-source starter kit cost $0.
      </p>

      <div className="mt-10 mb-8">
        <CopyText value="bunx degit jotyy/stratokit stratokit" />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Hosted on</span>
        <svg
          className="h-14 w-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
        >
          <path
            fill="#FFFFFF"
            d="M18.344 74.922h-2.75v9.892h7.528v-2.398h-4.778zm12.959-.211c-3.05 0-5.342 2.31-5.342 5.148v.035c0 2.839 2.257 5.113 5.307 5.113 3.05 0 5.342-2.31 5.342-5.148v-.035c0-2.839-2.257-5.113-5.307-5.113zm2.521 5.183c0 1.428-1.005 2.645-2.521 2.645-1.499 0-2.521-1.234-2.521-2.662v-.035c0-1.428 1.005-2.645 2.504-2.645 1.516 0 2.539 1.234 2.539 2.662v.035zm12.571.6c0 1.375-.723 2.028-1.816 2.028s-1.816-.67-1.816-2.098v-5.501h-2.786v5.554c0 3.103 1.763 4.514 4.566 4.514 2.821 0 4.637-1.393 4.637-4.584v-5.483h-2.786v5.57zm10.791-5.572h-3.808v9.891h3.755c3.562 0 5.642-2.116 5.642-4.972v-.035c0-2.856-2.063-4.884-5.589-4.884zm2.785 4.955c0 1.604-1.093 2.504-2.733 2.504v-.018h-1.111v-5.025h1.111c1.64 0 2.733.917 2.733 2.504v.035zm6.788 4.937h2.733v-3.527h4.69v-2.274h-4.69V77.32h5.184v-2.398h-7.917zm14.458-9.892h-2.733v9.892h7.529v-2.398h-4.796zm11.954-.07-4.196 9.962h2.874l.705-1.763h3.808l.723 1.763h2.944l-4.214-9.962h-2.644zm.211 6.065 1.111-2.803 1.093 2.803h-2.204zm18.954-2.574v-.035c0-.987-.3-1.745-.882-2.31-.67-.688-1.71-1.076-3.227-1.076h-4.672v9.909h2.75v-2.997h1.199l1.992 2.997h3.174l-2.363-3.456c1.218-.511 2.029-1.516 2.029-3.032zm-2.768.159c0 .705-.529 1.164-1.463 1.164h-1.816v-2.363h1.798c.917 0 1.481.388 1.481 1.164v.035zM119 82.486v-1.569h4.743v-2.169H119V77.25h5.237v-2.328h-7.952v9.892h8.022v-2.328zM7.325 77.197c1.128 0 1.992.688 2.345 1.64h2.892c-.458-2.363-2.539-4.108-5.219-4.108-3.05 0-5.342 2.31-5.342 5.148v.035c0 2.839 2.257 5.113 5.307 5.113 2.609 0 4.655-1.693 5.184-3.949l-2.891-.018c-.388.864-1.199 1.481-2.257 1.481-1.499 0-2.521-1.252-2.521-2.662v-.035c-.002-1.429 1.003-2.645 2.502-2.645z"
          />
          <path
            fill="#F38020"
            d="M107.223 68.716c.37-1.269.229-2.433-.388-3.297-.564-.793-1.516-1.252-2.662-1.305l-21.704-.282a.404.404 0 0 1-.335-.176.486.486 0 0 1-.053-.388.596.596 0 0 1 .511-.388l21.898-.282c2.592-.123 5.413-2.222 6.4-4.796l1.252-3.262a.694.694 0 0 0 .035-.423 14.24 14.24 0 0 0-13.911-11.143c-6.277 0-11.601 4.055-13.505 9.68a6.48 6.48 0 0 0-4.496-1.252 6.42 6.42 0 0 0-5.73 5.73 6.7 6.7 0 0 0 .159 2.239 9.11 9.11 0 0 0-8.851 9.115c0 .441.035.882.088 1.322.035.212.212.37.423.37h40.058a.545.545 0 0 0 .511-.388l.3-1.074z"
          />
          <path
            fill="#F38020"
            d="M114.134 54.77c-.194 0-.406 0-.599.018-.141 0-.264.106-.317.247l-.846 2.944c-.37 1.269-.229 2.433.388 3.297.564.793 1.516 1.252 2.662 1.305l4.619.282c.141 0 .264.071.335.176a.496.496 0 0 1 .053.388.596.596 0 0 1-.511.388l-4.813.282c-2.609.123-5.413 2.222-6.4 4.796l-.353.899c-.071.176.053.353.247.353h16.538c.194 0 .37-.123.423-.317.282-1.023.441-2.098.441-3.209-.001-6.524-5.326-11.849-11.867-11.849"
          />
        </svg>
      </div>

      <RetroGrid />
    </div>
  );
}
