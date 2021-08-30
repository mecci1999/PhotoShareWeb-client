<template>
  <div class="user-account-set-avatar">
    <div class="form">
      <h2 class="header">设置头像</h2>
      <div class="field" v-if="avatarFile">
        <div class="user-avatar large">
          <img :src="avatarPreviewImage" class="image" />
        </div>
      </div>
      <div class="fields">
        <FileField
          :text="avatarFileFieldText"
          size="large"
          name="avatar"
          fileType="image/*"
          @change="onChangeAvatarFileField"
        ></FileField>
        <ButtonField
          v-if="avatarFile"
          text="取消"
          size="large"
          type="outline"
          @click="onClickCancelButton"
        ></ButtonField>
        <ButtonField
          text="提交"
          size="large"
          @click="onClickSubmitButton"
        ></ButtonField>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import ButtonField from '@/app/components/button-field.vue';
import FileField from '@/app/components/file-field.vue';

export default defineComponent({
  name: 'UserAccountSetAvatar',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      avatarFile: null,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      avatarPreviewImage: 'user/account/avatarPreviewImage',
    }),
    avatarFileFieldText() {
      return this.avatarFile ? '重新选择' : '选择头像';
    },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setAvatarPreviewImage: 'user/account/setAvatarPreviewImage',
    }),

    ...mapActions({
      createAvatar: 'user/account/createAvatar',
      pushMessage: 'notification/pushMessage',
    }),

    async onClickSubmitButton() {
      try {
        await this.createAvatar(this.avatarFile);

        this.pushMessage({ content: '成功设置了头像！' });
        this.avatarFile = '';
      } catch (error) {
        this.pushMessage({ content: '设置头像出了问题！' });
      }
    },

    onChangeAvatarFileField(files) {
      if (files.length) {
        this.createAvatarPreviewImage(files[0]);
        this.avatarFile = files[0];
      }
    },

    createAvatarPreviewImage(file) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = event => {
        this.setAvatarPreviewImage(event.target.result);
      };
    },

    onClickCancelButton() {
      this.setAvatarPreviewImage = '';
      this.avatarFile = null;
    },
  },

  /**
   * 使用组件
   */
  components: {
    ButtonField,
    FileField,
  },
});
</script>

<style scoped></style>
