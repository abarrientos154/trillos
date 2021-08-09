<template>
  <div class="row justify-around ">
    <q-scroll-area
        horizontal
        style="height: 130px; width: 100%;"
        class="bg-grey-1 rounded-borders"
      >
        <div class="row no-wrap">
          <q-btn v-for="(item, index) in categorias" flat push color="white" text-color="black" class="q-mt-sm q-mr-sm q-ml-sm" :key="index">
        <div class="column items-center justify-center">
          <q-avatar square size="40px">
            <img :src="item.icons">
          </q-avatar>
          <div class="text-caption">{{item.name}}</div>
        </div>
      </q-btn>
        </div>
      </q-scroll-area>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      categorias: [
      ]
    }
  },
  mounted () {
    this.obtenerDatos()
  },
  methods: {
    obtenerDatos () {
      this.$api.get('categoryById/' + this.id).then(res => {
        if (res) {
          this.categorias.push(res)
        }
      })
    }
  }

}
</script>

<style>

</style>>
