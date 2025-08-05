import { e as defineNuxtRouteMiddleware } from '../server.mjs';
import 'vue';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';
import 'vue/server-renderer';

const amid = defineNuxtRouteMiddleware((to, from) => {
});

export { amid as default };
//# sourceMappingURL=amid-aQzIuX-6.mjs.map
