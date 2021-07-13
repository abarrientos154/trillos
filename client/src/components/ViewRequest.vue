<template>
  <div>
    <q-card>
      <div class="absolute-top-right q-pr-sm">Fecha de Solicitud {{data.fechaCreacion}} </div>
        <div class="column items-center justify-center">
          <div class="text-center text-white q-mt-lg text-h5" :class="`bg-${data.colorRadio}`" style="width:100%">{{data.name}}</div>
        </div>
        <div class="row items-center q-pt-lg">
          <div class="col-5 row justify-center">
            <q-avatar size="100px">
              <img :src="profile + 'perfil' + data.creador._id">
            </q-avatar>
          </div>
          <div class="col-7">
            <div class="row items-center no-wrap">
              <q-icon size="sm" name="person" color="grey-7" />
              <div class="text-grey-9 ellipsis">{{data.creador.full_name}} {{data.creador.last_name}}</div>
            </div>
            <div class="row q-mt-sm items-center no-wrap">
              <q-icon size="sm" name="phone" color="grey-7" />
              <div class="text-grey-9 ellipsis">{{data.creador.phone}}</div>
            </div>
            <div class="row q-mt-sm items-center no-wrap">
              <q-icon size="sm" name="place" color="grey-7" />
              <div class="text-grey-9 ellipsis">{{data.direccion}}</div>
            </div>
            <div class="row q-mt-sm items-center no-wrap">
              <q-icon size="sm" name="clean_hands" color="grey-7" />
              <div class="text-grey-9 ellipsis">{{data.categorianame.name}}</div>
            </div>
          </div>
        </div>
        <div class="row justify-around items-center q-pt-md q-mb-md">
          <div class="text-subtitle1 text-grey-9">Urgencia requerimiento</div>
          <div class="row">
            <q-radio v-model="data.colorRadio" keep-color size="xs" val="red" color="red" />
            <q-radio v-model="data.colorRadio" keep-color size="xs" val="orange" color="orange" />
            <q-radio v-model="data.colorRadio" keep-color size="xs" val="blue" color="blue" />
          </div>
        </div>
        <div class="q-ml-md text-h6 text-bold q-mt-md">Descripcion del servicio</div>
        <div class="row q-mb-lg" style="height:60px">
          <div class="col-12 q-px-md text-grey-9 ellipsis-3-lines">{{data.descripcion}}</div>
        </div>
        <div class="q-ml-md text-h6 text-bold q-mt-md">Fotos del automovil</div>
        <q-scroll-area
          horizontal
          style="height: 110px;"
          class="q-ml-md"
        >
          <div class="row no-wrap" style="width: 100%">
            <q-card v-for="(img, index) in data.images" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index" @click="imgSelec = baseu + img, showImg = true">
              <q-img :src="data.images ? baseu + img : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
            </q-card>
          </div>
        </q-scroll-area>
        <div class="row justify-center q-pa-sm q-mt-md">
          <q-btn rounded  color="primary" label="Contactar" no-caps style="width:200px"/>
        </div>
    </q-card>
    <q-dialog v-model="showImg">
      <q-card>
        <img :src="imgSelec" spinner-color="white" style="height: 100%; width: 100%" />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import env from '../env'
export default {
  props: ['data', 'profile'],
  data () {
    return {
      baseu: '',
      imgSelec: '',
      showImg: false
    }
  },
  mounted () {
    this.baseu = env.apiUrl + '/necesidad_img/'
    console.log('this.data :>> ', this.data)
  }
}
</script>
