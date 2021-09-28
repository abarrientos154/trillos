<template>
  <div>
    <div class="row justify-around q-ma-sm">
        <q-btn no-caps class="shadow-11 col-5 q-mb-sm" :color="btn[0]" text-color="black" label="Semanal" @click="filter('semanal')" />
        <q-btn no-caps class="shadow-11 col-5 q-mb-sm" :color="btn[1]" text-color="black" label="Mensual" @click="filter('mensual')" />
        <q-btn no-caps class="shadow-11 col-5 q-mb-sm" :color="btn[2]" text-color="black" label="Semestral" @click="filter('semestral')" />
        <q-btn no-caps class="shadow-11 col-5 q-mb-sm" :color="btn[3]" text-color="black" label="Anual" @click="filter('anual')" />
        <q-select clearable outlined  class="col-5 q-mb-sm"  v-model="estado" :options="dataestado" option-label="estado" option-value="estado" label="filtrado por estado" map-options emit-value @input="getData_estado()" />
        <q-input outlined  class="col-5 q-mb-sm" v-model="monto" label="ingrese un monto" @input="getData_monto()" />
        <q-input v-model="date" outlined  class="col-5 q-mb-sm" filled type="date" hint="ingrese una fecha" @input="getData_fecha()" />
        <q-input outlined  class="col-5 q-mb-sm" v-model="nombre" label="ingrese una palabra" @input="getData_nombre()">
         <template v-slot:append>
          <q-icon name="search" />
        </template>
        </q-input>

    </div>
    <q-separator inset />
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center estilo-titulos">Mis Reportes</div>
    </div>

    <div v-if="data.length > 0" class="q-pa-md q-gutter-md">
        <q-card @click="$router.push('/ver_reporte/'+cotizacion.necesidad_id+'/'+cotizacion._id)" class="bordes row q-pl-md q-py-md q-pr-xs" v-for="(cotizacion, index) in data" :key="index">
            <div class="col-4">
                <q-img :src=" baseu + cotizacion.datos_necesidad.images[0]" style="height:80px; width:100px" />
            </div>
            <div class="col-8">
              <div class="text-black text-bold text-subtitle1 q-pl-sm">{{cotizacion.datos_necesidad.name}}</div>
              <q-scroll-area
                horizontal
                style="height: 20px; width: 100%;"
                class="rounded-borders"
                >
                <div class="text-caption q-pl-sm">{{cotizacion.datos_cliente ? cotizacion.datos_cliente.full_name + ' ' + cotizacion.datos_cliente.last_name : cotizacion.datos_proveedor.full_name}}</div>
              </q-scroll-area>
              <div class="text-caption q-pl-sm">Finalizó: <strong>{{cotizacion.fecha_termino}}</strong></div>
            </div>
        </q-card>
    </div>

    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin nada que reportar...</div>
    </q-card>
  </div>
</template>

<script>
import env from '../env'
import moment from 'moment'
export default {
  data () {
    return {
      baseu: '',
      date: '',
      estado: null,
      monto: null,
      nombre: null,
      dataestado: [
        {
          estado: 'cotizados'
        },
        {
          estado: 'iniciados'
        },
        {
          estado: 'terminados'
        }
      ],
      btn: ['white', 'white', 'white', 'white'],
      today: null,
      ratingProduc: 3,
      allData: [],
      data: []
    }
  },
  mounted () {
    this.getData()
    this.baseu = env.apiUrl + '/necesidad_img/'
  },
  methods: {
    getData () {
      this.$api.get('show_all_cotizations').then(res => {
        if (res) {
          this.allData = res.filter(v => v.status === 'Terminado')
          this.data = this.allData
        }
      })
    },
    getData_estado () {
      this.$api.get('show_all_cotizations').then(res => {
        if (res) {
          if (this.estado === 'terminados') {
            this.allData = res.filter(v => v.status === 'Terminado')
          } else if (this.estado === 'iniciados') {
            this.allData = res.filter(v => v.status === 'Iniciado')
          } else if (this.estado === 'cotizados') {
            this.allData = res.filter(v => v.status === 'Cotizado')
          }
          this.data = this.allData
        }
      })
    },
    getData_monto () {
      this.$api.get('show_all_cotizations').then(res => {
        if (res) {
          this.allData = res.filter(v => v.cotizacion.total === parseInt(this.monto))
          this.data = this.allData
        }
      })
    },
    getData_nombre () {
      this.$api.get('show_all_cotizations').then(res => {
        if (res) {
          this.allData = res.filter(v => v.datos_necesidad.name === this.nombre)
          this.data = this.allData
        }
      })
    },
    getData_fecha () {
      this.$api.get('show_all_cotizations').then(res => {
        if (res) {
          this.allData = res.filter(v => v.fechaCreacion === moment(this.date).format('DD/MM/YYYY'))
          this.data = this.allData
        }
      })
    },
    filter (val) {
      if (val === 'semanal') {
        this.btn = ['primary', 'white', 'white', 'white']
        this.data = this.allData.filter(v => moment(v.created_at).year() === moment().year() && moment(v.created_at).week() === moment().week())
      } else if (val === 'mensual') {
        this.btn = ['white', 'primary', 'white', 'white']
        this.data = this.allData.filter(v => moment(v.created_at).year() === moment().year() && moment(v.created_at).month() === moment().month())
      } else if (val === 'anual') {
        this.btn = ['white', 'white', 'white', 'primary']
        this.data = this.allData.filter(v => moment(v.created_at).year() === moment().year())
      } else if (val === 'semestral') {
        this.btn = ['white', 'white', 'primary', 'white']
        var monthToday = moment().subtract(6, 'month')
        this.data = this.allData.filter(v => moment(v.created_at) >= monthToday)
      }
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
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
</style>
