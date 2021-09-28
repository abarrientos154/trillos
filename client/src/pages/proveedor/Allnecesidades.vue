<template>
  <div>
  <q-card class="bordes q-pa-xs q-mt-md shadow-up-4" style="border-radius:25px">
    <div class="column items-center justify-center q-mx-md text-h6">{{'Necesidades'}}</div>
  <q-list separator class="q-pa-md q-gutter-md">
      <q-item class="bordes row q-pl-md q-py-sm q-pr-xs" v-for="(img, index) in data" :key="index">
        <q-item-section thumbnail>
          <div clickable v-ripple @click="(ruta === 'cliente') || (ruta === 'tienda') ? $router.push('/descripcionproducto/' + img._id) : $router.push('/descripcionsolicitud/' + img._id)">
            <img class="q-ml-xs" :src="img.fileName ? baseu + '/' + img.fileName : img.images ? baseu + '/' + img.images[0] : 'noimgpro.png'" style="height:80px; width:100px" />
          </div>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption q-pl-sm">Nombre: <strong>{{img.name}}</strong> </q-item-label>
          <q-item-label v-if="img.direccion" class="text-caption q-pl-sm">Direccion: <strong>{{img.direccion}}</strong> </q-item-label>
          <q-item-label v-if="img.chat_info" class="text-caption q-pl-sm">Estatus: <strong>{{img.chat_info.status}}</strong> </q-item-label>
          <div v-if="!img.chat_info">
          <q-item-label class="text-caption q-pl-sm">Estatus: <strong>{{img.status}}</strong> </q-item-label>
          <q-chip clickable @click="cambio = true, necesidad_id = img._id" color="primary" text-color="black" icon="edit">
            Asignar Estatus
          </q-chip>
        </div>
        </q-item-section>
      </q-item>
  </q-list>
  </q-card>
  <q-dialog v-model="cambio">
      <q-card>
        <q-card-section>
          <div class="column items-center justify-center text-h6">Seleccione el estatus</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select v-model="model" :options="options" />
        </q-card-section>

         <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" text-color="black" v-close-popup />
          <q-btn flat label="Confirmar" color="primary" text-color="black" @click="cambioestatus()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import env from '../../env'
export default {
  data () {
    return {
      necesidad_id: null,
      data: {},
      cambio: false,
      model: 'Mediacion',
      options: ['Mediacion', 'Suspencion'],
      baseu: ''
    }
  },
  mounted () {
    this.necesidades()
    this.baseu = env.apiUrl + '/necesidad_img'
  },
  methods: {
    necesidades () {
      this.$api.get('necesidad').then(res => {
        this.data = res
      })
    },
    cambioestatus () {
      this.$api.put('necesidadestatus/' + this.necesidad_id + '/' + this.model).then(res => {
        if (res) {
          this.necesidades()
        }
      })
    }

  }
}
</script>

<style scoped lang="scss">
.bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
}
</style>
