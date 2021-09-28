<template>
  <div>
    <q-separator inset />
    <div class="row justify-center">
        <div v-if="datosusuario">
            <q-card class="bg-amber-1 q-pa-md q-ma-md shadow-3">
                <div class="row justify-center items-center">
                  <div class="column items-center justify-center">
                    <div class="q-mt-none q-ml-sm text-h7 text-grey-9 text-bold"></div>
                      <q-avatar size="180px">
                        <img :src="baseu + 'perfil' + form._id" >
                      </q-avatar>
                      <div class="text-h5 q-ma-sm text-center text-bold"> {{form.full_name}} {{form.last_name }} </div>
                    </div>
                         <q-list style="width:100%">
                            <q-item clickable v-ripple>
                              <q-item-section avatar>
                                <q-icon color="primary" name="mail" />
                              </q-item-section>
                              <q-item-section> {{form.email}}</q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                              <q-item-section avatar>
                                <q-icon color="primary" name="credit_card" />
                              </q-item-section>
                              <q-item-section> {{form.run_dni}}</q-item-section>
                            </q-item>

                            <div class="q-mt-sm row">
                              <q-item clickable v-ripple>
                                    <q-item-section avatar>
                                      <q-icon color="primary" name="room" />
                                    </q-item-section>
                                  <q-item-section>{{form.country}}, {{form.direccion}}</q-item-section>
                              </q-item>
                            </div>
                            <q-item clickable v-ripple>
                              <q-item-section avatar>
                                <q-icon color="primary" name="phone" />
                              </q-item-section>
                              <q-item-section>{{form.phone}}</q-item-section>
                            </q-item>
                          </q-list>
                    <div class="row justify-center q-pa-sm">
                      <q-btn color="primary" label="Actualizar Datos" @click="$router.push('/Datosedit')"/>
                    </div>
                </div>
            </q-card>
        </div>

          <div v-if="datosproveedor">
           <q-card class="bg-amber-1 q-pa-md q-ma-md shadow-3">
                <div class="row justify-center items-center">
                  <div class="column items-center justify-center">
                    <q-avatar size="180px">
                      <img :src="baseu + 'perfil' + form._id" >
                    </q-avatar>
                    <div class="text-h5 q-ma-sm text-center text-bold"> {{form.full_name}}</div>
                  </div>
                          <q-list style="width:100%">
                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon color="primary" name="mail" />
                            </q-item-section>
                            <q-item-section> {{form.email}}</q-item-section>
                          </q-item>

                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon color="primary" name="credit_card" />
                            </q-item-section>
                            <q-item-section> {{form.run_dni}}</q-item-section>
                          </q-item>
                          <div class="q-mt-sm row">
                            <q-item clickable v-ripple>
                                  <q-item-section avatar>
                                    <q-icon color="primary" name="room" />
                                  </q-item-section>
                                <q-item-section>{{form.country}}, {{form.direccion}}</q-item-section>
                            </q-item>
                          </div>

                          <div class="q-mt-sm column">
                            <div  class="q-mt-md q-pl-md text-grey-10">Fotos que posee la tienda:</div>
                              <q-card class="q-pa-md bg-amber-1 shadow-up-3 q-mt-sm" style="border-top-left-radius:25px;border-top-right-radius:25px">
                              <q-scroll-area
                              horizontal
                              style="height: 110px;"
                            >
                              <div class="row no-wrap" style="width: 100%">
                                <q-card v-for="(item, index) in form.tiendaFiles" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
                                  <q-img :src="form.tiendaFiles ? baseu2 + item : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
                                </q-card>
                              </div>
                            </q-scroll-area>
                          </q-card>
                          </div>

                        <div v-if="delivery">
                            <div class="q-mt-md q-pl-md text-grey-10">Delivery de la empresa:</div>
                            <q-toggle
                            v-model="form.delivery" label="Activado" icon="delivery_dining" color="primary" disable/>
                        </div>

                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon color="primary" name="calendar_today" />
                            </q-item-section>
                              <div class="row">
                                <div v-for="(dia,index) in form.dias" :key="index" class="q-ml-sm">
                                  {{dias[dia-1]}}
                                </div>
                              </div>
                        </q-item>

                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon color="primary" name="access_time" />
                            </q-item-section>
                            <q-item-section>{{ form.hora_inicio }} - {{ form.hora_fin }}</q-item-section>
                          </q-item>

                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon color="primary" name="phone" />
                            </q-item-section>

                            <q-item-section>{{form.phone}}</q-item-section>
                          </q-item>
                          </q-list>
                    <div class="row justify-center q-pa-sm">
                      <q-btn color="primary" label="Actualizar Datos" @click="$router.push('/Datosedit')"/>
                    </div>
                </div>
            </q-card>
          </div>
    </div>
  </div>
</template>
<script>
import env from '../env'
export default {
  data () {
    return {
      datosusuario: false,
      datosproveedor: false,
      form: {},
      perfilFile: null,
      delivery: false,
      imgPerfil: '',
      baseu: '',
      baseu2: '',
      usuario: {},
      rol: null,
      tiendaFiles: [],
      imgTienda: [],
      id_datos: '',
      dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    }
  },
  mounted () {
    this.getUser()
    this.baseu = env.apiUrl + '/perfil_img/'
    this.baseu2 = env.apiUrl + '/tienda_img/'
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.form = v
        }
        if (this.rol === 3) {
          this.datosproveedor = true
        }
        if (this.form.delivery === true) {
          this.delivery = true
        }
        if (this.rol === 2) {
          this.datosusuario = true
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
.estilo-titulos {
  background-color: #fff8bd;
  width: 250px;
  border-radius: 12px
}
</style>
