import { DefaultRenderer } from "@hiveio/content-renderer";

const renderer = new DefaultRenderer({
  baseUrl: "https://hive.blog/",
  breaks: true,
  skipSanitization: false,
  allowInsecureScriptTags: false,
  addNofollowToLinks: true,
  doNotShowImages: false,
  assetsWidth: 640,
  assetsHeight: 480,
  imageProxyFn: url => url,
  usertagUrlFn: account => "/@" + account,
  hashtagUrlFn: hashtag => "/trending/" + hashtag,
  isLinkSafeFn: url => true,
  addExternalCssClassToMatchingLinksFn: url => true,
  ipfsPrefix: "https://ipfs.io/ipfs/", // IPFS gateway to display ipfs images
});

export default renderer;
