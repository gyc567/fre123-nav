import { useSSRContext, defineComponent, computed, mergeProps, unref, ref, withCtx, createVNode, withDirectives, toDisplayString, openBlock, createBlock, withModifiers, createCommentVNode, vShow } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-yVxbj29m.mjs';
import __nuxt_component_0$2 from './Icon-W9IktuBI.mjs';
import { g as getConfigItem, C as CONFIG_KEY_SEO } from '../server.mjs';
import './index-aihNpapE.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Tooltip",
  __ssrInlineRender: true,
  props: {
    content: {
      type: String,
      default: ""
    },
    nowrap: {
      type: Boolean,
      default: false
    },
    // JX-TODO 接收需要控制的 dom 节点 ID，这里先用 ID 来控制，后续可考虑优化
    elementId: {
      type: String,
      default: ""
    },
    forceShow: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "down"
    }
  },
  setup(__props) {
    const tooltipVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))} data-v-3535fa22>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<div class="${ssrRenderClass([[unref(tooltipVisible) ? "block" : "hidden", __props.nowrap ? "w-full" : "whitespace-nowrap "], "absolute z-20 tooltip px-2 py-[3px] text-[12px] leading-[22px] text-white bg-[#323233] bg-opacity-[85%] rounded"])}" style="${ssrRenderStyle({
        transform: `translate(-50%,${__props.nowrap ? "100%" : "100%"})`
      })}" data-v-3535fa22>${ssrInterpolate(__props.content)}</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Style/Tooltip.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-3535fa22"]]);
const classNamePrefixGroup = "nav_group_";
const classNamePrefixGroupTab = "nav_group_tab_";
const padding = 12;
const fontSize = 14;
const scale = 0.6;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "IndexNavGroup",
  __ssrInlineRender: true,
  props: {
    groupData: {},
    idx: {}
  },
  setup(__props) {
    const props = __props;
    const currTab = ref(0);
    ref(false);
    const tabName = ref(props.groupData.tab_list[0].tab_name);
    const showNumber = ref(100);
    const initWidth = Math.round(tabName.value.length * fontSize * scale);
    const initLeft = ref(0);
    const getTranslateX = () => {
      let left = 0;
      for (let i = 0; i < currTab.value; i++) {
        left += padding * 2 + tabName.value.length * fontSize;
      }
      left += Math.round(padding + tabName.value.length * fontSize * (1 - scale) / 2);
      initLeft.value = left;
    };
    getTranslateX();
    const showToSourceIcon = (type, idx, t) => {
      const element = (void 0).getElementById(`to-source-icon-${idx}-${t}`);
      if (type == "show") {
        element == null ? void 0 : element.classList.remove("hidden");
        element == null ? void 0 : element.classList.add("flex");
      } else {
        element == null ? void 0 : element.classList.remove("flex");
        element == null ? void 0 : element.classList.add("hidden");
      }
    };
    const jumpOut = (url) => {
      (void 0).open(url + "?ref=https://www.fre123.com", "_blank");
    };
    const stop = ($event) => {
      $event.stopPropagation();
      $event.preventDefault();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_StyleTooltip = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_0$2;
      if (_ctx.groupData.tab_list[unref(currTab)].details.filter((i) => i.is_show).length > 0) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          id: `${classNamePrefixGroup}${_ctx.groupData.group_name}`,
          class: "index-nav-group bg-white pt-[10px] mb-[20px] px-4 rounded-lg",
          "aria-label": `${_ctx.groupData.group_name}\u5DE5\u5177\u5206\u7C7B`
        }, _attrs))} data-v-7a7f8e1c><header class="flex flex-row pl-[5px] pt-[8px] leading-[28px] overflow-x-scroll no-scrollbar" data-v-7a7f8e1c><h2 class="text-gray-500 text-md md:text-lg flex" data-v-7a7f8e1c><span class="text-[16px] md:text-[18px] text-[#555555] pr-2 font-semibold truncate" data-v-7a7f8e1c>${ssrInterpolate(_ctx.groupData.group_name)}</span></h2><div class="h-[18px] my-[5px] w-[2px] bg-gray-200 mx-4 md:mx-8" data-v-7a7f8e1c></div><div class="justify-center items-center text-[#888] flex-none" data-v-7a7f8e1c><div data-v-7a7f8e1c><ul class="flex relative h-[28x] leading-[28px] overflow-hidden" data-v-7a7f8e1c><li${ssrRenderAttr("id", `${classNamePrefixGroup}${_ctx.idx}_anchor`)} class="anchor text-[14px] h-full" style="${ssrRenderStyle({
          width: `${unref(initWidth)}px`,
          left: `${unref(initLeft)}px`
        })}" data-v-7a7f8e1c></li><!--[-->`);
        ssrRenderList(_ctx.groupData.tab_list, (tab, i) => {
          _push(`<li${ssrRenderAttr("data-index", i)}${ssrRenderAttr("id", `${classNamePrefixGroupTab}${_ctx.groupData.group_name}_${tab.tab_name}`)} class="${ssrRenderClass([`${unref(currTab) == i ? "active" : "font-wei"}`, "z-10 hover:text-[#007bff] hover:cursor-pointer active:text-[#007bff] active:font-bold px-3 text-[14px]"])}" data-v-7a7f8e1c>${ssrInterpolate(tab.tab_name)}</li>`);
        });
        _push(`<!--]--></ul></div><div class="flex-fill" data-v-7a7f8e1c></div></div><div class="flex-grow text-right text-red-500 text-[14px] hidden md:block text-ellipsis overflow-x-hidden whitespace-nowrap" data-v-7a7f8e1c><a class="hover:text-red-700"${ssrRenderAttr("href", (_a = _ctx.groupData.tab_list[unref(currTab)].upper_right_corner) == null ? void 0 : _a.url)} target="_blank" data-v-7a7f8e1c>${ssrInterpolate((_b = _ctx.groupData.tab_list[unref(currTab)].upper_right_corner) == null ? void 0 : _b.title)}</a></div></header><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2 mt-[24px] cursor-pointer" role="list"${ssrRenderAttr("aria-label", `${_ctx.groupData.group_name}\u5DE5\u5177\u5217\u8868`)} data-v-7a7f8e1c><!--[-->`);
        ssrRenderList(_ctx.groupData.tab_list[unref(currTab)].details.filter((i) => i.is_show), (item, t) => {
          _push(ssrRenderComponent(_component_StyleTooltip, {
            key: item.title,
            content: item.description,
            nowrap: true,
            "element-id": `desc-${_ctx.idx}-${t}`,
            class: ["mb-[10px]", ` ${unref(showNumber) <= t ? "hidden" : ""}`],
            role: "listitem"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<article data-v-7a7f8e1c${_scopeId}><a style="${ssrRenderStyle(item.is_show ? null : { display: "none" })}" class="index-nav-group-content-item rounded-xl shadow shadow-warm-gray-500 items-center py-[8px] px-[8px] border-[1px] border-white"${ssrRenderAttr("href", item.url)} target="_blank" rel="nofollow"${ssrRenderAttr("aria-label", `\u8BBF\u95EE${item.title} - ${item.description}`)} data-v-7a7f8e1c${_scopeId}><img class="index-nav-group-content-item-icon"${ssrRenderAttr("src", item.icon)}${ssrRenderAttr("alt", `${item.title}\u56FE\u6807`)} loading="lazy" data-v-7a7f8e1c${_scopeId}><div class="index-nav-group-content-item-main" data-v-7a7f8e1c${_scopeId}><h3 class="index-nav-group-content-item-name" data-v-7a7f8e1c${_scopeId}>${ssrInterpolate(item.title)}</h3><p${ssrRenderAttr("id", `desc-${_ctx.idx}-${t}`)} class="index-nav-group-content-item-desc" data-v-7a7f8e1c${_scopeId}>${ssrInterpolate(item.description)}</p></div>`);
                if (item.ori_url) {
                  _push2(`<div${ssrRenderAttr("id", `to-source-icon-${_ctx.idx}-${t}`)} class="hidden h-full items-center" data-v-7a7f8e1c${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_Icon, {
                    size: "18",
                    class: "flex items-center text-slate-400 hover:text-slate-500",
                    name: "uil:arrow-circle-right"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</a></article>`);
              } else {
                return [
                  createVNode("article", null, [
                    withDirectives(createVNode("a", {
                      class: "index-nav-group-content-item rounded-xl shadow shadow-warm-gray-500 items-center py-[8px] px-[8px] border-[1px] border-white",
                      href: item.url,
                      target: "_blank",
                      rel: "nofollow",
                      "aria-label": `\u8BBF\u95EE${item.title} - ${item.description}`,
                      onMouseover: ($event) => showToSourceIcon("show", _ctx.idx, t),
                      onMouseout: ($event) => showToSourceIcon("hide", _ctx.idx, t)
                    }, [
                      createVNode("img", {
                        class: "index-nav-group-content-item-icon",
                        src: item.icon,
                        alt: `${item.title}\u56FE\u6807`,
                        loading: "lazy"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "index-nav-group-content-item-main" }, [
                        createVNode("h3", { class: "index-nav-group-content-item-name" }, toDisplayString(item.title), 1),
                        createVNode("p", {
                          id: `desc-${_ctx.idx}-${t}`,
                          class: "index-nav-group-content-item-desc"
                        }, toDisplayString(item.description), 9, ["id"])
                      ]),
                      item.ori_url ? (openBlock(), createBlock("div", {
                        key: 0,
                        id: `to-source-icon-${_ctx.idx}-${t}`,
                        class: "hidden h-full items-center",
                        onClick: [
                          withModifiers(stop, ["stop"]),
                          ($event) => jumpOut(item.ori_url)
                        ]
                      }, [
                        createVNode(_component_Icon, {
                          size: "18",
                          class: "flex items-center text-slate-400 hover:text-slate-500",
                          name: "uil:arrow-circle-right"
                        })
                      ], 8, ["id", "onClick"])) : createCommentVNode("", true)
                    ], 40, ["href", "aria-label", "onMouseover", "onMouseout"]), [
                      [vShow, item.is_show]
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Index/IndexNavGroup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7a7f8e1c"]]);
const navList = [
  {
    group_name: "\u52A0\u5BC6\u8D44\u8BAF",
    style: 1,
    style_des: "\u6807\u51C6\u98CE\u683C",
    tab_list: [
      {
        tab_name: "\u52A0\u5BC6\u5E38\u7528",
        upper_right_corner: {
          title: "\u52A0\u5BC6\u8D44\u8BAF\u6C47\u603B>>>",
          url: "https://medium.com/@gyc56"
        },
        details: [
          {
            title: "\u4EE3\u5E01\u5E02\u503C\u6BD4\u8F83\u5668",
            ori_url: "https://mc.smartwallex.com/",
            url: "https://mc.smartwallex.com/",
            icon: "/cryptoCompare.jpg",
            description: "\u6700\u597D\u7528\u7684\u5E02\u503C\u6BD4\u8F83\u5668",
            suffix: false,
            is_show: true
          },
          {
            title: "\u6D41\u52A8\u6027Hunter",
            ori_url: "https://liqhunter.smartwallex.com/",
            url: "https://liqhunter.smartwallex.com/",
            icon: "/liqHunter.jpg",
            description: "\u6D41\u52A8\u6027Hunter",
            suffix: false,
            is_show: true
          },
          {
            title: "\u6D41\u52A8\u6027Hunter Plus",
            ori_url: "https://lhr.smartwallex.com/",
            url: "https://lhr.smartwallex.com/",
            icon: "/lhr.jpg",
            description: "\u6D41\u52A8\u6027Hunter Plus",
            suffix: false,
            is_show: true
          },
          {
            title: "\u6D41\u52A8\u6027Hunter Lion",
            ori_url: "https://lh.smartwallex.com/",
            url: "https://lh.smartwallex.com/",
            icon: "/lh.jpg",
            description: "\u6D41\u52A8\u6027Hunter Lion",
            suffix: false,
            is_show: true
          },
          {
            title: "\u4EA4\u6613\u6240\u5408\u7EA6\u8BA1\u7B97\u5668",
            ori_url: "https://ccc.smartwallex.com/",
            url: "https://ccc.smartwallex.com/",
            icon: "/cccLogo.jpg",
            description: "\u7B80\u5355\u597D\u7528\u7684\u5408\u7EA6\u8BA1\u7B97\u5668",
            suffix: false,
            is_show: true
          },
          {
            title: "\u806A\u660E\u94B1\u8DDF\u8E2A\u5E73\u53F0",
            ori_url: "https://platform.spotonchain.com/zh",
            url: "https://platform.spotonchain.com/zh",
            icon: "/SpotOnChain_Logo.jpg",
            description: "\u6700\u597D\u7528\u7684\u806A\u660E\u94B1\u8DDF\u8E2A\u5206\u6790\u5E73\u53F0",
            suffix: false,
            is_show: true
          },
          {
            title: "\u52A0\u5BC6\u65B0\u95FB\u70ED\u699C",
            ori_url: "https://www.theblockbeats.info/newsflash",
            url: "https://www.theblockbeats.info/newsflash",
            icon: "https://img.fre123.com/i/2024/01/18/65a81a0370405.jpg",
            description: "\u52A0\u5BC6\u65B0\u95FB\u70ED\u699C\u6C47\u96C6\u5404\u5E73\u53F0\u6280\u672F\u70ED\u70B9\u8D44\u8BAF\uFF0C\u52A9\u60A8\u5FEB\u901F\u4E86\u89E3\u5B9E\u65F6\u8D44\u8BAF",
            suffix: false,
            is_show: true
          },
          {
            title: "\u52A0\u5BC6\u6280\u672F\u70ED\u699C",
            ori_url: "https://www.techflowpost.com/newsletter/index.html",
            url: "https://www.techflowpost.com/newsletter/index.html",
            icon: "https://img.fre123.com/i/2024/01/18/65a819ea7d80f.jpg",
            description: "\u52A0\u5BC6\u6280\u672F\u70ED\u699C\u6C47\u96C6\u5404\u5E73\u53F0\u6280\u672F\u70ED\u70B9\u8D44\u8BAF\uFF0C\u52A9\u60A8\u5FEB\u901F\u4E86\u89E3\u5B9E\u65F6\u8D44\u8BAF",
            suffix: false,
            is_show: true
          },
          {
            title: "\u52A0\u5BC6\u7CBE\u9009\u5468\u520A",
            ori_url: "https://medium.com/@gyc567",
            url: "https://medium.com/@gyc567",
            icon: "https://img.fre123.com/i/2024/01/18/65a81a125a343.jpg",
            description: "\u8FD9\u662FEric\u63D0\u4F9B\u7684\u6280\u672F\u601D\u8003\u53CA\u6700\u65B0\u7684\u52A0\u5BC6\u5468\u520A\u4FE1\u606F\u6D41\u3002",
            suffix: false,
            is_show: true
          },
          {
            title: "\u52A0\u5BC6ChainFeeds\u70ED\u70B9",
            ori_url: "https://www.chainfeeds.xyz/",
            url: "https://www.chainfeeds.xyz/",
            icon: "/chainfeeds_logo.jpg",
            description: "\u4E0E\u4E16\u754C\u5206\u4EAB\u52A0\u5BC6\u70ED\u70B9 ",
            suffix: false,
            is_show: true
          },
          {
            title: "CoinMarketCap",
            ori_url: "https://coinmarketcap.com/",
            url: "https://coinmarketcap.com/",
            icon: "/cmc_logo.jpg",
            description: "\u6700\u5168\u4EE3\u5E01\u6570\u636E\u8D44\u8BAF\u5E73\u53F0\uFF1Acoinmarketcap.com",
            suffix: false,
            is_show: true
          },
          {
            title: "CoinGecko",
            ori_url: "https://www.coingecko.com/",
            url: "https://www.coingecko.com/",
            icon: "/coingecko_logo.jpg",
            description: "\u4EE3\u5E01\u4EF7\u683C\u4E0E\u5E02\u503C\u6570\u636E\u5E73\u53F0\uFF1Acoingecko.com",
            suffix: false,
            is_show: true
          },
          {
            title: "\u94FE\u6355\u624B",
            ori_url: "https://www.chaincatcher.com/",
            url: "https://www.chaincatcher.com/",
            icon: "/chainCatcher.jpg",
            description: "\u533A\u5757\u94FE\u65B0\u95FB\u5E73\u53F0",
            suffix: false,
            is_show: true
          }
        ]
      },
      {
        upper_right_corner: {
          title: "\u4E2D\u5FC3\u5316\u4EA4\u6613\u6240\u6C47\u603B>>>",
          url: "https://medium.com/@gyc567/%E4%B8%AD%E5%BF%83%E5%8C%96%E4%BA%A4%E6%98%93%E6%89%80%E6%B1%87%E6%80%BB-03a73e8306b7"
        },
        tab_name: "\u4E2D\u5FC3\u5316\u4EA4\u6613\u6240",
        details: [
          {
            title: "\u5E01\u5B89\u4EA4\u6613\u6240",
            ori_url: "https://www.binance.com/activity/referral-entry/CPA/together-v4?hl=zh-CN&ref=CPA_00OY78C3X4",
            url: "https://www.binance.com/activity/referral-entry/CPA/together-v4?hl=zh-CN&ref=CPA_00OY78C3X4",
            icon: "/binance_logo.jpg",
            description: "\u5168\u7403\u6700\u5927\u7684\u4EA4\u6613\u6240",
            suffix: false,
            is_show: true
          },
          {
            title: "\u829D\u9EBB\u4EA4\u6613\u6240",
            ori_url: "https://www.gateio24.com/signup/VlFFBg1W?ref_type=103",
            url: "https://www.gateio24.com/signup/VlFFBg1W?ref_type=103",
            icon: "/gate_logo.jpg",
            description: "\u8001\u724C\u4EA4\u6613\u6240\uFF0C\u7A33\u5B9A\uFF0C\u53EF\u9760",
            suffix: false,
            is_show: true
          },
          {
            title: "\u6B27\u6613\u4EA4\u6613\u6240",
            ori_url: "https://okx.com/join/2270923",
            url: "https://okx.com/join/2270923",
            icon: "/okx_logo.jpg",
            description: "\u6392\u540D\u524D\u4E09\u7684\u4EA4\u6613\u6240",
            suffix: false,
            is_show: true
          },
          {
            title: "BitGet\u4EA4\u6613\u6240",
            ori_url: "https://partner.bitgetapp.com/bg/L9BLZB",
            url: "https://partner.bitgetapp.com/bg/L9BLZB",
            icon: "/bitget_logo.jpg",
            description: "\u6392\u540D\u9760\u524D\u7684\u4EA4\u6613\u6240",
            suffix: false,
            is_show: true
          }
        ]
      },
      {
        upper_right_corner: {
          title: "\u65B0\u624B\u5165\u95E8\u5927\u5168>>>",
          url: "https://medium.com/@gyc567/%E6%96%B0%E6%89%8B%E5%85%A5%E9%97%A8%E5%A4%A7%E5%85%A8-9c9200c54615"
        },
        tab_name: "\u65B0\u624B\u5165\u95E8\u5B66\u4E60\u5927\u5168",
        details: [
          {
            title: "\u5E01\u5B89\u5B66\u9662",
            url: "https://academy.binance.com/zh/",
            icon: "/bn_academy.jpg",
            description: "\u65B0\u624B\u53EF\u4EE5\u5728\u8FD9\u91CC\u5B66\u4E60\u5165\u95E8\u548C\u57FA\u7840\u77E5\u8BC6",
            suffix: true,
            is_show: true
          },
          {
            title: "\u52A0\u5BC6\u8D27\u5E01\u767E\u79D1\u5168\u4E66",
            url: "https://iq.wiki/zh",
            icon: "/iq_wiki.jpg",
            description: "\u4E16\u754C\u4E0A\u6700\u5927\u7684 \u533A\u5757\u94FE\u548C\u52A0\u5BC6\u8D27\u5E01\u767E\u79D1\u5168\u4E66",
            suffix: true,
            is_show: true
          },
          {
            title: "\u829D\u9EBB\u52A0\u5BC6\u5B66\u9662",
            url: "https://www.gate.io/zh/learn",
            icon: "/gate_logo.jpg",
            description: "\u829D\u9EBB\u4EA4\u6613\u6240\u7684\u52A0\u5BC6\u8D27\u5E01\u5B66\u9662",
            suffix: true,
            is_show: true
          }
        ]
      }
    ]
  },
  {
    group_name: "\u5E02\u573A\u6570\u636E",
    style: 1,
    style_des: "\u6807\u51C6\u98CE\u683C",
    tab_list: [
      {
        tab_name: "\u7EFC\u5408\u6570\u636E\u5206\u6790\u5E73\u53F0",
        upper_right_corner: {},
        details: [
          {
            title: "CoinGlass",
            url: "https://www.coinglass.com/zh",
            icon: "/CoinGlass.jpg",
            description: "\u52A0\u5BC6\u8D27\u5E01\u884D\u751F\u54C1\u6570\u636E\u5206\u6790\u5E73\u53F0",
            suffix: true,
            is_show: true
          },
          {
            title: "CoinAnk",
            url: "https://coinank.com/zh",
            icon: "/coinAnk.jpg",
            description: "\u5168\u9762\u7684\u52A0\u5BC6\u8D27\u5E01\u6570\u636E\u5206\u6790\u5E73\u53F0",
            suffix: true,
            is_show: true
          },
          {
            title: "\u975E\u5C0F\u53F7",
            url: "https://www.feixiaohao.com/",
            icon: "/fxh_logo.jpg",
            description: "\u8001\u724C\u7684\u52A0\u5BC6\u8D27\u5E01\u6570\u636E\u805A\u5408\u5E73\u53F0",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "K\u7EBF\u6570\u636E",
        upper_right_corner: {},
        details: [
          {
            title: "TradingView",
            url: "https://cn.tradingview.com/",
            icon: "/TradingView.jpg",
            description: "\u4E13\u4E1A\u7684K\u6570\u636E\u5E73\u53F0",
            suffix: true,
            is_show: true
          },
          {
            title: "AICoin",
            url: "https://www.aicoin.com/zh-Hans",
            icon: "/AICoin_Logo.jpg",
            description: "\u4E13\u4E1A\u7684\u4EA4\u6613\u6240K\u6570\u636E\u5E73\u53F0",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u94FE\u4E0A\u6570\u636E\u5E73\u53F0",
        upper_right_corner: {},
        details: [
          {
            title: "AVE",
            url: "https://ave.ai/",
            icon: "/AVE_Logo.jpg",
            description: "\u94FE\u4E0A\u805A\u5408\u6570\u636E\u5E73\u53F0\u53CA\u4E00\u7EA7MEME\u4EA4\u6613\u5E73\u53F0",
            suffix: true,
            is_show: true
          },
          {
            title: "DexTools",
            url: "https://www.dextools.io/app/cn/pairs",
            icon: "/DexTools_Logo.jpg",
            description: "\u5916\u7F51\u6700\u6D41\u884C\u7684\u4E00\u7EA7MEME\u4EA4\u6613\u5E73\u53F0\u53CA\u6570\u636E\u805A\u5408\u5E73\u53F0",
            suffix: true,
            is_show: true
          },
          {
            title: "DexScreener",
            url: "https://dexscreener.com/",
            icon: "/DexScreener_Logo.jpg",
            description: "\u5916\u7F51\u4E00\u7EA7MEME\u4EA4\u6613\u5E73\u53F0\u53CA\u6570\u636E\u805A\u5408\u5E73\u53F0",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u94FE\u4E0A\u5DE8\u9CB8\u6570\u636E\u8FFD\u8E2A",
        upper_right_corner: {},
        details: [
          {
            title: "Whale Alert",
            url: "https://whale-alert.io/",
            icon: "/WhaleAlert_Logo.jpg",
            description: "\u5168\u9762\u7684\u5DE8\u9CB8\u6570\u636E\u8FFD\u8E2A\u5E73\u53F0",
            suffix: true,
            is_show: true
          },
          {
            title: "Block AI",
            url: "https://www.blockin.ai/",
            icon: "/BlockAI_Logo.jpg",
            description: "\u667A\u80FD\u7684\u5DE8\u9CB8\u6570\u636E\u8FFD\u8E2A\u5E73\u53F0",
            suffix: true,
            is_show: true
          },
          {
            title: "\u6B27\u6613\u5929\u773C\u94FE\u4E0A\u67E5\u8BE2\u5DE5\u5177",
            url: "https://www.oklinkpro.com/#/",
            icon: "/OKLink_Logo.jpg",
            description: "\u6B27\u6613\u7684\u94FE\u4E0A\u6570\u636E\u8FFD\u8E2A\u5E73\u53F0",
            suffix: true,
            is_show: true
          }
        ]
      }
    ]
  },
  {
    group_name: "DEFI\u53BB\u4E2D\u5FC3\u5316\u91D1\u878D",
    style: 1,
    style_des: "\u6807\u51C6\u98CE\u683C",
    tab_list: [
      {
        tab_name: "DEFI\u4EEA\u8868\u76D8",
        upper_right_corner: {
          title: "\u{1F525}DEFI\u4EEA\u8868\u76D8\u6C47\u603B>>>",
          url: "https://medium.com/@gyc567/defi%E4%BB%AA%E8%A1%A8%E7%9B%98%E6%B1%87%E6%80%BB-6ee38a9517ff"
        },
        details: [
          {
            title: "defillama",
            url: "https://defillama.com/",
            icon: "/Defillama_Logo.jpg",
            description: "\u6700\u5168\u9762\u7684defi\u6570\u636E\u4EEA\u8868\u76D8\uFF0C\u5305\u62ECTVL\u3001\u4EA4\u6613\u91CF\u3001APR\u3001\u5E74\u5316\u7B49\uFF0C\u53EF\u4E00\u952E\u67E5\u770B\u3002",
            suffix: true,
            is_show: true
          },
          {
            title: "de.fi",
            url: "https://de.fi/",
            icon: "/Defi_Logo.jpg",
            description: "\u597D\u7528\u7684defi\u6570\u636E\u4EEA\u8868\u76D8\u3002",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u53BB\u4E2D\u5FC3\u5316\u94B1\u5305",
        upper_right_corner: {
          title: "\u{1F525}\u53BB\u4E2D\u5FC3\u5316\u94B1\u5305\u6C47\u603B>>>",
          url: "https://medium.com/@gyc567/%E5%8E%BB%E4%B8%AD%E5%BF%83%E5%8C%96%E9%92%B1%E5%8C%85%E6%B1%87%E6%80%BB-faf8f5cdb534"
        },
        details: [
          {
            title: "IMToken\u94B1\u5305",
            url: "https://www.token.im/",
            icon: "/IMToken_Logo.jpg",
            description: "\u8001\u724C\u7684\u53BB\u4E2D\u5FC3\u5316\u94B1\u5305",
            suffix: true,
            is_show: true
          },
          {
            title: "TP\u94B1\u5305",
            url: "https://www.tokenpocket.pro/",
            icon: "/TP_Wallet_Logo.jpg",
            description: "\u7528\u6237\u6700\u591A\u7684\u53BB\u4E2D\u5FC3\u5316\u94B1\u5305",
            suffix: true,
            is_show: true
          },
          {
            title: "MetaMask\u94B1\u5305",
            url: "https://metamask.io/",
            icon: "/Mask_Logo.jpg",
            description: "\u5168\u7403\u7528\u6237\u6700\u591A\u7684\u53BB\u4E2D\u5FC3\u5316\u94B1\u5305",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "NFT \u5DE5\u5177",
        upper_right_corner: {
          title: "\u{1F525}NFT \u5DE5\u5177\u6C47\u603B>>>",
          url: "https://medium.com/@gyc567/nft-%E5%B7%A5%E5%85%B7%E6%B1%87%E6%80%BB-9685f0c38729"
        },
        details: [
          {
            title: "NFTGo",
            url: "https://nftgo.io/",
            icon: "/NFTGo_Logo.jpg",
            description: "\u591A\u5408\u4E00\u7684NFT\u5206\u6790\u5E73\u53F0\u3002",
            suffix: true,
            is_show: true
          },
          {
            title: "NFTScan",
            url: "https://www.nftscan.com/",
            icon: "/NFTScan_Logo.jpg",
            description: "NFT\u94FE\u4E0A\u5206\u6790\u5E73\u53F0\u3002",
            suffix: true,
            is_show: true
          },
          {
            title: "NFTEye",
            url: "https://nfteye.io/",
            icon: "/NFTEye_Logo.jpg",
            description: "NFT\u5206\u6790\u4E0E\u4EA4\u6613\u5E73\u53F0\u3002",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u8DE8\u94FE\u6865",
        upper_right_corner: {
          title: "\u{1F525}\u8DE8\u94FE\u6865\u6C47\u603B>>>",
          url: "https://medium.com/@gyc567/%E8%B7%A8%E9%93%BE%E6%A1%A5%E6%B1%87%E6%80%BB-84d6a538f9fe"
        },
        details: [
          {
            title: "Across\u8DE8\u94FE\u6865",
            url: "https://across.to/",
            icon: "/Across_Logo.jpg",
            description: "EVM\u8DE8\u94FE\u6865\u3002",
            suffix: true,
            is_show: true
          },
          {
            title: "DeBridge\u8DE8\u94FE\u6865",
            url: "https://debridge.finance/",
            icon: "/DeBridge_Logo.jpg",
            description: "DeBridge\u8DE8\u94FE\u6865",
            suffix: true,
            is_show: true
          }
        ]
      }
    ]
  },
  {
    group_name: "MEME\u8D44\u6E90\u4E0E\u5DE5\u5177",
    style: 1,
    style_des: "MEME\u8D44\u6E90\u4E0E\u5DE5\u5177",
    tab_list: [
      {
        tab_name: "\u806A\u660E\u94B1\u8FFD\u8E2A",
        upper_right_corner: {},
        details: [
          {
            title: "LookOnChain",
            url: "https://x.com/lookonchain",
            icon: "/LookOnChain.jpg",
            description: "\u94FE\u4E0A\u8FFD\u8E2A\u806A\u660E\u94B1\u7684\u8FFD\u8E2A\u5DE5\u5177\u3002",
            suffix: true,
            is_show: true
          },
          {
            title: "WatcherGuru",
            url: "https://watcher.guru/",
            icon: "/WatcherGuru_Logo.jpg",
            description: "\u94FE\u4E0A\u8FFD\u8E2A\u7EFC\u5408\u5E73\u53F0\u3002",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u65B0\u624B\u5165\u95E8\u4E0E\u6559\u7A0B",
        upper_right_corner: {},
        details: [
          {
            title: "MEME\u65B0\u624B\u5165\u95E8\u4E0E\u6559\u7A0B\u6C47\u603B",
            url: "https://medium.com/@gyc567/meme%E6%96%B0%E6%89%8B%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B%E6%B1%87%E6%80%BB-71831d65f0f6",
            icon: "/DegeCoin_Logo.jpg",
            description: "MEME\u65B0\u624B\u5165\u95E8\u4E0E\u6559\u7A0B\u6C47\u603B",
            suffix: true,
            is_show: true
          },
          {
            title: "Web3Caff",
            url: "https://research.web3caff.com/",
            icon: "/Web3Caff_Logo.jpg",
            description: "Web3\u6295\u7814\u4E0E\u6559\u80B2\u793E\u533A",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u7CBE\u9009TG\u9891\u9053",
        upper_right_corner: {},
        details: [
          {
            title: "\u6BD4\u7279\u8D22\u5546",
            url: "https://t.me/cryptochanneleric",
            icon: "/btcs_Logo.jpg",
            description: "\u4E13\u4E1A\u5206\u6790\u5E01\u5708\u8D8B\u52BF\u548C\u91D1\u72D7\u6295\u7814",
            suffix: true,
            is_show: true
          },
          {
            title: "BlockBeats",
            url: "https://t.me/theblockbeats",
            icon: "/BlockBeats_Logo.jpg",
            description: "\u5B9E\u65F6\u5E01\u5708\u8D44\u8BAF.",
            suffix: true,
            is_show: true
          }
        ]
      }
    ]
  },
  {
    group_name: "\u5B9E\u7528\u5DE5\u5177",
    style: 1,
    style_des: "\u6807\u51C6\u98CE\u683C",
    tab_list: [
      {
        tab_name: "\u7EFC\u5408\u67E5\u8BE2",
        upper_right_corner: {},
        details: [
          {
            title: "Dune",
            url: "https://dune.com/discover/content/trending",
            icon: "/Dune_Logo.jpg",
            description: "\u514D\u8D39\u7684\u8D85\u5F3A\u94FE\u4E0A\u67E5\u8BE2\u3001\u5206\u6790\u3001\u53EF\u89C6\u5316\u5DE5\u5177\uFF01",
            suffix: true,
            is_show: true
          },
          {
            title: "Nansen",
            url: "https://www.nansen.ai/",
            icon: "https://img.fre123.com/i/2024/01/17/65a6b70ea384c.ico",
            description: "\u6700\u4E13\u4E1A\u7684\u94FE\u4E0A\u5206\u6790\u5DE5\u5177\uFF01",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u6307\u6570\u67E5\u8BE2",
        upper_right_corner: {},
        details: [
          {
            title: "\u8D2A\u5A6A\u6307\u6570",
            url: "https://www.coinglass.com/zh/pro/i/FearGreedIndex",
            icon: "/GreedIdx_Logo.jpg",
            description: "\u5E01\u5708\u8D2A\u5A6A\u4E0E\u6050\u60E7\u6307\u6570",
            suffix: true,
            is_show: true
          },
          {
            title: "\u6BD4\u7279\u5E01ahr999\u5C6F\u5E01\u6307\u6807",
            url: "https://www.coinglass.com/zh/pro/i/ahr999",
            icon: "/Ahr999_Logo.jpg",
            description: "\u6BD4\u7279\u5E01ahr999\u5C6F\u5E01\u6307\u6807,\u7528\u6765\u5224\u65AD\u662F\u5426\u9700\u8981\u4E70\u5165\u6216\u5356\u51FA\u6216\u5B9A\u6295\u6BD4\u7279\u5E01\u3002",
            suffix: true,
            is_show: true
          },
          {
            title: "\u5C71\u5BE8\u5E01\u6307\u6570",
            url: "https://www.blockchaincenter.net/en/altcoin-season-index/",
            icon: "/AltcoinIdx_Logo.jpg",
            description: "\u5C71\u5BE8\u5E01\u6307\u6807,\u7528\u6765\u5224\u65AD\u662F\u5426\u9700\u8981\u4E70\u5165\u6216\u5356\u51FA\u6216\u5B9A\u6295\u5C71\u5BE8\u5E01\u3002",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u5E01\u79CD\u5B98\u7F51",
        upper_right_corner: {},
        details: [
          {
            title: "BTC\u6BD4\u7279\u5E01",
            url: "https://bitcoin.org/",
            icon: "/Btc_Logo.jpg",
            description: "\u6BD4\u7279\u5E01\u5B98\u7F51",
            suffix: true,
            is_show: true
          },
          {
            title: "BCH\u6BD4\u7279\u73B0\u91D1",
            url: "https://bitcoincash.org/",
            icon: "/Bch_Logo.jpg",
            description: "BCH\u5B98\u7F51",
            suffix: true,
            is_show: true
          },
          {
            title: "ETH\u4EE5\u592A\u574A",
            url: "https://ethereum.org/zh/",
            icon: "/ETH_Logo.jpg",
            description: "\u4EE5\u592A\u574A\u5B98\u7F51",
            suffix: true,
            is_show: true
          },
          {
            title: "DOT\u6CE2\u5361",
            url: "https://polkadot.com/",
            icon: "/Dot_Logo.jpg",
            description: "\u6CE2\u5361\u94FE\u5B98\u7F51",
            suffix: true,
            is_show: true
          },
          {
            title: "LuckyCoin",
            url: "https://luckycoinfoundation.org/",
            icon: "/Lucky_Logo.jpg",
            description: "\u5E78\u8FD0\u5E01\u5B98\u7F51",
            suffix: true,
            is_show: true
          }
        ]
      }
    ]
  },
  {
    group_name: "\u5B89\u5168\u670D\u52A1\u4E0E\u5DE5\u5177",
    style: 1,
    style_des: "\u6807\u51C6\u98CE\u683C",
    tab_list: [
      {
        tab_name: "\u6388\u6743\u76F8\u5173",
        upper_right_corner: {},
        details: [
          {
            title: "RevokeCash",
            url: "https://revoke.cash/",
            icon: "/Revoke_Logo.jpg",
            description: "\u4EE3\u5E01\u6388\u6743\u64A4\u6D88\u5DE5\u5177\u3002",
            suffix: true,
            is_show: true
          },
          {
            title: "\u591A\u7B7E\u94B1\u5305",
            url: "https://safe.global/",
            icon: "/Safe_Logo.jpg",
            description: "\u8001\u724C\u7684\u591A\u7B7E\u94B1\u5305\u3002",
            suffix: true,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u5B89\u5168\u5206\u6790\u5E73\u53F0",
        upper_right_corner: {},
        details: [
          {
            title: "\u5408\u7EA6\u5206\u6790\u5E73\u53F0GoPlusLabs",
            url: "https://gopluslabs.io/",
            icon: "/GoPlus_Logo.jpg",
            description: "\u667A\u80FD\u5408\u7EA6\u5B89\u5168\u5206\u6790\u5E73\u53F0\u3002",
            suffix: false,
            is_show: true
          },
          {
            title: "\u5929\u7F51SkyNet",
            url: "https://skynet.certik.com/zh-CN",
            icon: "/SkyNet_Logo.jpg",
            description: "\u9879\u76EE\u5B89\u5168\u5206\u6790\u5E73\u53F0\u3002",
            suffix: false,
            is_show: true
          }
        ]
      }
    ]
  },
  {
    group_name: "\u5E01\u5708\u5A92\u4F53",
    style: 1,
    style_des: "\u6807\u51C6\u98CE\u683C",
    tab_list: [
      {
        tab_name: "\u63A8\u7279\u5927V",
        upper_right_corner: {},
        details: [
          {
            title: "\u9A6C\u65AF\u514B",
            url: "https://x.com/elonmusk",
            icon: "/Elon_Logo.jpg",
            description: "\u63A8\u7279\u8001\u677F,\u5730\u7403\u4E0A\u6700\u6709\u96C4\u5FC3\u7684\u7537\u4EBA\u3002",
            suffix: false,
            is_show: true
          },
          {
            title: "V\u795E",
            url: "https://x.com/VitalikButerin",
            icon: "/Vitalik_Logo.jpg",
            description: "\u4EE5\u592A\u574A\u521B\u59CB\u4EBA\u3002",
            suffix: false,
            is_show: true
          }
        ]
      },
      {
        tab_name: "\u5916\u7F51\u6743\u5A01\u5E01\u5708\u5A92\u4F53",
        upper_right_corner: {},
        details: [
          {
            title: "bitcoinmagazine",
            url: "https://bitcoinmagazine.com/",
            icon: "/BtcMgz_Logo.jpg",
            description: "\u8001\u724C\u5E01\u5708\u5A92\u4F53\u7F51\u7AD9\u3002",
            suffix: false,
            is_show: true
          }
        ]
      }
    ]
  },
  {
    group_name: "\u56FE\u7247\u58C1\u7EB8",
    style: 1,
    style_des: "\u56FE\u7247\u58C1\u7EB8",
    tab_list: [
      {
        tab_name: "\u514D\u8D39\u58C1\u7EB8",
        upper_right_corner: {},
        details: [
          {
            title: "WallpaperCave",
            url: "https://wallpapercave.com/",
            icon: "https://img.fre123.com/i/2024/01/17/65a6bc92d513b.png",
            description: "\u5927\u91CF\u9AD8\u6E05\u58C1\u7EB8\u548C\u80CC\u666F\u56FE\u50CF\u53EF\u4EE5\u514D\u8D39\u4E0B\u8F7D\u3002\u4F60\u4E5F\u53EF\u4EE5\u4E0A\u4F20\u548C\u5206\u4EAB\u4F60\u6700\u559C\u6B22\u58C1\u7EB8",
            suffix: false,
            is_show: false
          },
          {
            title: "WallpapersCraft",
            url: "https://wallpaperscraft.com/",
            icon: "https://img.fre123.com/i/2024/01/17/65a6bb13b331b.ico",
            description: "\u652F\u6301 PC \u548C Mac\u3001\u7B14\u8BB0\u672C\u7535\u8111\u3001\u5E73\u677F\u7535\u8111\u3001\u624B\u673A\u7684\u5206\u8FA8\u7387\uFF0C\u5404\u7C7B\u58C1\u7EB8\u3001\u9AD8\u6E05\u80CC\u666F",
            suffix: false,
            is_show: false
          }
        ]
      },
      {
        tab_name: "\u6444\u5F71\u7F8E\u56FE",
        upper_right_corner: {},
        details: [
          {
            title: "Tookapic",
            url: "https://tookapic.com/photos",
            icon: "https://img.fre123.com/i/2024/01/17/65a6b9aeb547d.ico",
            description: "\u6BCF\u5929\u62CD\u4E00\u5F20\u7167\u7247\u6765\u53D1\u73B0\u548C\u8868\u8FBE\u81EA\u5DF1\uFF0C\u6539\u5584\u4F60\u7684\u65E5\u5E38\u751F\u6D3B\u3002",
            suffix: false,
            is_show: false
          },
          {
            title: "35photo",
            url: "https://35photo.pro/new/actual/",
            icon: "https://img.fre123.com/i/2024/01/17/65a6c0bc54cda.png",
            description: "\u4E00\u4E2A\u9AD8\u8D28\u91CF\u56FE\u7247\u5206\u4EAB\u5E73\u53F0\uFF0C\u5F20\u5F20\u7CBE\u54C1",
            suffix: false,
            is_show: false
          }
        ]
      }
    ]
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const seoInfo = getConfigItem(CONFIG_KEY_SEO);
    const seoTitle = computed(() => seoInfo["title"]);
    const seoDescription = computed(() => seoInfo["description"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IndexNavGroup = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ ref: "container" }, _attrs))}><section class="hero-section" style="${ssrRenderStyle({ "text-align": "center", "padding": "20px 0" })}"><h1 style="${ssrRenderStyle({ "font-size": "2rem", "font-weight": "bold", "margin-bottom": "1rem", "color": "#333" })}">${ssrInterpolate(unref(seoTitle))}</h1><p style="${ssrRenderStyle({ "font-size": "1.1rem", "color": "#666", "max-width": "800px", "margin": "0 auto" })}">${ssrInterpolate(unref(seoDescription))}</p></section><nav id="nav-container" aria-label="\u52A0\u5BC6\u8D27\u5E01\u5DE5\u5177\u5BFC\u822A" role="navigation"><!--[-->`);
      ssrRenderList(unref(navList), (nav, i) => {
        _push(ssrRenderComponent(_component_IndexNavGroup, {
          key: nav.group_name,
          idx: i,
          groupData: nav
        }, null, _parent));
      });
      _push(`<!--]--></nav></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-piu9qQ9m.mjs.map
