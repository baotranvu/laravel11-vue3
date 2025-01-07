import { App } from "vue";
import EditButton from "@/components/buttons/EditButton.vue";
import DeleteButton from "@/components/buttons/DeleteButton.vue";

export default {
  install(app: App): void {
    app.component("EditButton", EditButton);
    app.component("DeleteButton", DeleteButton);
  },
};
