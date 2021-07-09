<template>
  <div>
    <div class="">
      <q-carousel
          animated
          v-model="slide"
          navigation
          swipeable
          infinite
          class="fullscreen"
        >

        <q-carousel-slide v-for="(item, index) in options_roles" :key="index" :name="index+1" :img-src="item.image">
        <q-carousel-control
            position="bottom-left"
            :offset="[40, 50]"
          >
            <p align="center" style="cursor:pointer;width:300px"><a class="text-bold text-white text-h5" @click="onSubmit(item.value)" >{{item.label}}</a></p>
          </q-carousel-control>
        </q-carousel-slide>
        <template v-slot:control>

        </template>
      </q-carousel>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      options_roles: [
        { label: 'Quiero ser Taller', value: 3, icon: 'store', image: 'https://cdn.quasar.dev/img/parallax1.jpg' },
        { label: 'Cliente', value: 2, icon: 'person', image: 'https://cdn.quasar.dev/img/quasar.jpg' }
      ],
      slide: 1
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    onSubmit (rol) {
      console.log(rol, 'elrol')
      this.$q.loading.show()
      this.form.roles = rol
      if (this.form.roles === 2) {
        this.panel.panel = 'parte_dos'
      } else if (this.form.roles === 3) {
        this.panel.panel = 'parte_dos_proveedor'
      }
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>>
