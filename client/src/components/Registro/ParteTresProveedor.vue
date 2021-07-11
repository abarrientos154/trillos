<template>
<div class="q-ma-md q-pa-md">
  <div class="column items-center justify-center">
    <div class="text-h6 text-center">¿Donde estará mi taller?</div>
    <div class="row justify-center q-mt-md">
      <img src="nopublicidad.jpg" style="width: 80%;height:200px; border-radius: 15px">
    </div>

    <div class="row q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-caption">Pais</div>
        <q-select filled v-model="form.country" label="País" outlined dense :options="countries" option-value="_id" option-label="name" emit-value map-options @input="getCitiesByCountry(form.country)" error-message="Ingrese un País" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-caption">Ciudad</div>
        <q-select filled v-model="form.city" label="Ciudad" outlined dense :options="cities" option-value="_id" option-label="name" emit-value map-options error-message="Ingrese su ciudad" :error="$v.form.city.$error" @blur="$v.form.city.$touch()" >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                Selecciona un país
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="text-caption">Dirección física del taller</div>
          <q-input
            v-model="form.direccion"
            placeholder="Mi direccion #1234"
            outlined
            filled
            dense
            error-message="Ingrese su Direccion"
            :error="$v.form.direccion.$error"
            @blur="$v.form.direccion.$touch()"
          />
      </div>
    </div>
    <div class="row justify-center" style="width:100%">
      <q-btn @click="next()" color="primary" label="Siguiente" rounded no-caps style="width:70%" class="q-py-xs"/>
    </div>
    </div>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      countries: [],
      cities: []
    }
  },
  validations () {
    return {
      form: {
        country: { required },
        city: { required },
        direccion: { required }
      }
    }
  },
  mounted () {
    this.getCountries()
  },
  methods: {
    async getCountries () {
      await this.$api.get('countries').then(res => {
        if (res) {
          this.countries = res
        }
      })
    },
    async getCitiesByCountry (id) {
      this.form.city = ''
      this.$v.form.city.$reset()
      await this.$api.get('cityByCountry/' + id).then(res => {
        if (res) {
          this.cities = res
        }
      })
    },
    async next () {
      if (this.panel.panel === 'parte_tres_proveedor_datos') {
        this.$q.loading.show()
        this.$v.form.$touch()
        if (!this.$v.form.country.$error && !this.$v.form.city.$error && !this.$v.form.direccion.$error) {
          this.panel.panel = 'parte_cuatro_proveedor_datos'
        }
      }
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>>
