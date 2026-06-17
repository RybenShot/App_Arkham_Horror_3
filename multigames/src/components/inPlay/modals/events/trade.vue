<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold">🤝 Intercambio</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal()"></i>
        </header>

        <section class="modal-card-body py-3" style="min-height: 300px;">

          <!-- LOADING -->
          <div v-if="tradeStatus === 'loading'" class="has-text-centered py-5">
            <button class="button is-loading is-white is-large is-rounded"></button>
            <p class="mt-3 subtitle is-6">Cargando intercambio...</p>
          </div>

          <!-- HOST: composing offer -->
          <div v-else-if="tradeStatus === 'waitingOffer' && isHost">
            <p class="title is-5 has-text-centered mb-3">Preparar oferta</p>

            <!-- Rival items – lo que quieres -->
            <p class="label is-small mb-1">
              <span class="tag is-warning mr-1">{{ rivalName }}</span>lo que quieres
            </p>
            <div v-if="rivalPossessions.length === 0" class="notification is-light py-2 mb-3">
              <p class="is-size-7 has-text-centered">{{ rivalName }} no tiene objetos</p>
            </div>
            <div class="objects-container mb-3" v-else>
              <div
                v-for="(item, index) in rivalPossessions" :key="item.id"
                class="object-item"
                :class="{ 'is-selected': isSelectedWant(item.id) }"
                :style="getCardStyle(index, rivalPossessions.length)"
                @click="toggleWant(item.id)">
                <CardObject :object="item" />
              </div>
            </div>

            <!-- My items – lo que ofreces -->
            <p class="label is-small mb-1">
              <span class="tag is-info mr-1">Tú</span>lo que ofreces
            </p>
            <div v-if="myPossessions.length === 0" class="notification is-light py-2 mb-3">
              <p class="is-size-7 has-text-centered">No tienes objetos para ofrecer</p>
            </div>
            <div class="objects-container mb-3" v-else>
              <div
                v-for="(item, index) in myPossessions" :key="item.id"
                class="object-item"
                :class="{ 'is-selected': isSelectedGive(item.id) }"
                :style="getCardStyle(index, myPossessions.length)"
                @click="toggleGive(item.id)">
                <CardObject :object="item" />
              </div>
            </div>

            <!-- Recursos – solo si alguien tiene algo -->
            <div v-if="myAttrs.money > 0 || rivalAttrs.money > 0 || myAttrs.clue > 0 || rivalAttrs.clue > 0 || myAttrs.remnant > 0 || rivalAttrs.remnant > 0" class="mt-2 mb-3">
              <p class="label is-small mb-1">Recursos</p>
              <div class="columns is-mobile is-vcentered mb-2" v-if="myAttrs.money > 0 || rivalAttrs.money > 0">
                <div class="column is-2"><span>💰</span></div>
                <div class="column">
                  <p class="is-size-7 has-text-centered has-text-info">Das ({{ myAttrs.money }})</p>
                  <div class="field has-addons is-justify-content-center mb-0">
                    <p class="control"><button class="button is-small is-info is-light" @click="selectedResourcesToGive.money = Math.max(0, selectedResourcesToGive.money - 1)">-</button></p>
                    <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="selectedResourcesToGive.money" readonly></p>
                    <p class="control"><button class="button is-small is-info is-light" @click="selectedResourcesToGive.money = Math.min(myAttrs.money, selectedResourcesToGive.money + 1)">+</button></p>
                  </div>
                </div>
                <div class="column">
                  <p class="is-size-7 has-text-centered has-text-warning">Quieres ({{ rivalAttrs.money }})</p>
                  <div class="field has-addons is-justify-content-center mb-0">
                    <p class="control"><button class="button is-small is-warning is-light" @click="selectedResourcesToWant.money = Math.max(0, selectedResourcesToWant.money - 1)">-</button></p>
                    <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="selectedResourcesToWant.money" readonly></p>
                    <p class="control"><button class="button is-small is-warning is-light" @click="selectedResourcesToWant.money = Math.min(rivalAttrs.money, selectedResourcesToWant.money + 1)">+</button></p>
                  </div>
                </div>
              </div>
              <div class="columns is-mobile is-vcentered mb-2" v-if="myAttrs.clue > 0 || rivalAttrs.clue > 0">
                <div class="column is-2"><span>🔍</span></div>
                <div class="column">
                  <p class="is-size-7 has-text-centered has-text-info">Das ({{ myAttrs.clue }})</p>
                  <div class="field has-addons is-justify-content-center mb-0">
                    <p class="control"><button class="button is-small is-info is-light" @click="selectedResourcesToGive.clue = Math.max(0, selectedResourcesToGive.clue - 1)">-</button></p>
                    <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="selectedResourcesToGive.clue" readonly></p>
                    <p class="control"><button class="button is-small is-info is-light" @click="selectedResourcesToGive.clue = Math.min(myAttrs.clue, selectedResourcesToGive.clue + 1)">+</button></p>
                  </div>
                </div>
                <div class="column">
                  <p class="is-size-7 has-text-centered has-text-warning">Quieres ({{ rivalAttrs.clue }})</p>
                  <div class="field has-addons is-justify-content-center mb-0">
                    <p class="control"><button class="button is-small is-warning is-light" @click="selectedResourcesToWant.clue = Math.max(0, selectedResourcesToWant.clue - 1)">-</button></p>
                    <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="selectedResourcesToWant.clue" readonly></p>
                    <p class="control"><button class="button is-small is-warning is-light" @click="selectedResourcesToWant.clue = Math.min(rivalAttrs.clue, selectedResourcesToWant.clue + 1)">+</button></p>
                  </div>
                </div>
              </div>
              <div class="columns is-mobile is-vcentered mb-2" v-if="myAttrs.remnant > 0 || rivalAttrs.remnant > 0">
                <div class="column is-2"><span>🧩</span></div>
                <div class="column">
                  <p class="is-size-7 has-text-centered has-text-info">Das ({{ myAttrs.remnant }})</p>
                  <div class="field has-addons is-justify-content-center mb-0">
                    <p class="control"><button class="button is-small is-info is-light" @click="selectedResourcesToGive.remnant = Math.max(0, selectedResourcesToGive.remnant - 1)">-</button></p>
                    <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="selectedResourcesToGive.remnant" readonly></p>
                    <p class="control"><button class="button is-small is-info is-light" @click="selectedResourcesToGive.remnant = Math.min(myAttrs.remnant, selectedResourcesToGive.remnant + 1)">+</button></p>
                  </div>
                </div>
                <div class="column">
                  <p class="is-size-7 has-text-centered has-text-warning">Quieres ({{ rivalAttrs.remnant }})</p>
                  <div class="field has-addons is-justify-content-center mb-0">
                    <p class="control"><button class="button is-small is-warning is-light" @click="selectedResourcesToWant.remnant = Math.max(0, selectedResourcesToWant.remnant - 1)">-</button></p>
                    <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="selectedResourcesToWant.remnant" readonly></p>
                    <p class="control"><button class="button is-small is-warning is-light" @click="selectedResourcesToWant.remnant = Math.min(rivalAttrs.remnant, selectedResourcesToWant.remnant + 1)">+</button></p>
                  </div>
                </div>
              </div>
            </div>

            <button class="button is-success is-fullwidth" @click="sendOffer()">
              📤 Enviar oferta
            </button>
          </div>

          <!-- GUEST: waiting for host's offer -->
          <div v-else-if="tradeStatus === 'waitingOffer' && !isHost" class="has-text-centered py-5">
            <button class="button is-loading is-white is-large is-rounded"></button>
            <p class="mt-3 subtitle is-6">{{ rivalName }} está preparando una oferta...</p>
          </div>

          <!-- HOST: offer sent, waiting for guest -->
          <div v-else-if="tradeStatus === 'offerPending' && isHost" class="has-text-centered py-3">
            <button class="button is-loading is-white is-large is-rounded mb-3"></button>
            <p class="subtitle is-6">Esperando respuesta de {{ rivalName }}...</p>
            <div class="box mx-2 mt-2 has-text-left">
              <p class="is-size-7 has-text-grey mb-2"><strong>Tu oferta enviada:</strong></p>
              <p class="is-size-7 mb-1">
                🎁 <strong>Das:</strong> {{ formatIdList(currentOffer.fromHost, 'mine') }}
                <span v-if="currentOffer.fromHost.money"> + 💰{{ currentOffer.fromHost.money }}</span>
                <span v-if="currentOffer.fromHost.clue"> + 🔍{{ currentOffer.fromHost.clue }}</span>
                <span v-if="currentOffer.fromHost.remnant"> + 🧩{{ currentOffer.fromHost.remnant }}</span>
              </p>
              <p class="is-size-7">
                🔍 <strong>Quieres:</strong> {{ formatIdList(currentOffer.fromGuest, 'rival') }}
                <span v-if="currentOffer.fromGuest.money"> + 💰{{ currentOffer.fromGuest.money }}</span>
                <span v-if="currentOffer.fromGuest.clue"> + 🔍{{ currentOffer.fromGuest.clue }}</span>
                <span v-if="currentOffer.fromGuest.remnant"> + 🧩{{ currentOffer.fromGuest.remnant }}</span>
              </p>
            </div>
          </div>

          <!-- GUEST: reviewing offer -->
          <div v-else-if="tradeStatus === 'offerPending' && !isHost">
            <p class="title is-5 has-text-centered mb-3">Oferta de {{ rivalName }}</p>

            <!-- Host (rival) ofrece -->
            <p class="label is-small mb-1">
              <span class="tag is-info mr-1">{{ rivalName }}</span>te ofrece
            </p>
            <div v-if="!(currentOffer.fromHost?.items?.length || currentOffer.fromHost?.money || currentOffer.fromHost?.clue || currentOffer.fromHost?.remnant)" class="has-text-grey is-size-7 mb-2">Nada</div>
            <div v-else class="mb-3">
              <div class="objects-container mb-1" v-if="currentOffer.fromHost?.items?.length">
                <div
                  v-for="(id, index) in currentOffer.fromHost.items" :key="id"
                  class="object-item no-hover"
                  :style="getCardStyle(index, currentOffer.fromHost.items.length)">
                  <CardObject :object="makeCardObj(id, 'rival')" />
                </div>
              </div>
              <div class="tags is-centered mb-0">
                <span v-if="currentOffer.fromHost?.money" class="tag is-info is-light">💰 {{ currentOffer.fromHost.money }}</span>
                <span v-if="currentOffer.fromHost?.clue" class="tag is-info is-light">🔍 {{ currentOffer.fromHost.clue }}</span>
                <span v-if="currentOffer.fromHost?.remnant" class="tag is-info is-light">🧩 {{ currentOffer.fromHost.remnant }}</span>
              </div>
            </div>

            <!-- Guest (tú) das -->
            <p class="label is-small mb-1">
              <span class="tag is-warning mr-1">Tú</span>das a cambio
            </p>
            <div v-if="!(currentOffer.fromGuest?.items?.length || currentOffer.fromGuest?.money || currentOffer.fromGuest?.clue || currentOffer.fromGuest?.remnant)" class="has-text-grey is-size-7 mb-3">Nada</div>
            <div v-else class="mb-3">
              <div class="objects-container mb-1" v-if="currentOffer.fromGuest?.items?.length">
                <div
                  v-for="(id, index) in currentOffer.fromGuest.items" :key="id"
                  class="object-item no-hover"
                  :style="getCardStyle(index, currentOffer.fromGuest.items.length)">
                  <CardObject :object="makeCardObj(id, 'mine')" />
                </div>
              </div>
              <div class="tags is-centered mb-0">
                <span v-if="currentOffer.fromGuest?.money" class="tag is-warning is-light">💰 {{ currentOffer.fromGuest.money }}</span>
                <span v-if="currentOffer.fromGuest?.clue" class="tag is-warning is-light">🔍 {{ currentOffer.fromGuest.clue }}</span>
                <span v-if="currentOffer.fromGuest?.remnant" class="tag is-warning is-light">🧩 {{ currentOffer.fromGuest.remnant }}</span>
              </div>
            </div>

            <div class="buttons is-centered mb-0" v-if="!makingCounteroffer">
              <button class="button is-success is-medium" @click="acceptOffer()">✅ Aceptar</button>
              <button class="button is-warning is-medium" @click="startCounteroffer()">🔄 Contraoferta</button>
            </div>

            <!-- Counteroffer builder -->
            <div v-if="makingCounteroffer" class="mt-3">
              <hr>
              <p class="title is-6 mb-2">Tu contraoferta</p>

              <!-- Rival items – lo que quieres del host -->
              <p class="label is-small mb-1">
                <span class="tag is-info mr-1">{{ rivalName }}</span>lo que quieres
              </p>
              <div v-if="rivalPossessions.length === 0" class="notification is-light py-2 mb-3">
                <p class="is-size-7 has-text-centered">{{ rivalName }} no tiene objetos</p>
              </div>
              <div class="objects-container mb-3" v-else>
                <div
                  v-for="(item, index) in rivalPossessions" :key="item.id"
                  class="object-item"
                  :class="{ 'is-selected': isCounterSelectedWant(item.id) }"
                  :style="getCardStyle(index, rivalPossessions.length)"
                  @click="toggleCounterWant(item.id)">
                  <CardObject :object="item" />
                </div>
              </div>

              <!-- Guest items – lo que ofreces -->
              <p class="label is-small mb-1">
                <span class="tag is-warning mr-1">Tú</span>lo que ofreces
              </p>
              <div v-if="myPossessions.length === 0" class="notification is-light py-2 mb-3">
                <p class="is-size-7 has-text-centered">No tienes objetos para ofrecer</p>
              </div>
              <div class="objects-container mb-3" v-else>
                <div
                  v-for="(item, index) in myPossessions" :key="item.id"
                  class="object-item"
                  :class="{ 'is-selected': isCounterSelectedGive(item.id) }"
                  :style="getCardStyle(index, myPossessions.length)"
                  @click="toggleCounterGive(item.id)">
                  <CardObject :object="item" />
                </div>
              </div>

              <!-- Recursos de contraoferta -->
              <div v-if="myAttrs.money > 0 || myAttrs.clue > 0 || myAttrs.remnant > 0" class="mb-3">
                <p class="label is-small mb-1">Recursos que ofreces</p>
                <div class="columns is-mobile is-vcentered mb-2" v-if="myAttrs.money > 0">
                  <div class="column is-2"><span>💰</span></div>
                  <div class="column">
                    <p class="is-size-7 has-text-centered has-text-warning">Das ({{ myAttrs.money }})</p>
                    <div class="field has-addons is-justify-content-center mb-0">
                      <p class="control"><button class="button is-small is-warning is-light" @click="counterResourcesToGive.money = Math.max(0, counterResourcesToGive.money - 1)">-</button></p>
                      <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="counterResourcesToGive.money" readonly></p>
                      <p class="control"><button class="button is-small is-warning is-light" @click="counterResourcesToGive.money = Math.min(myAttrs.money, counterResourcesToGive.money + 1)">+</button></p>
                    </div>
                  </div>
                </div>
                <div class="columns is-mobile is-vcentered mb-2" v-if="myAttrs.clue > 0">
                  <div class="column is-2"><span>🔍</span></div>
                  <div class="column">
                    <p class="is-size-7 has-text-centered has-text-warning">Das ({{ myAttrs.clue }})</p>
                    <div class="field has-addons is-justify-content-center mb-0">
                      <p class="control"><button class="button is-small is-warning is-light" @click="counterResourcesToGive.clue = Math.max(0, counterResourcesToGive.clue - 1)">-</button></p>
                      <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="counterResourcesToGive.clue" readonly></p>
                      <p class="control"><button class="button is-small is-warning is-light" @click="counterResourcesToGive.clue = Math.min(myAttrs.clue, counterResourcesToGive.clue + 1)">+</button></p>
                    </div>
                  </div>
                </div>
                <div class="columns is-mobile is-vcentered mb-2" v-if="myAttrs.remnant > 0">
                  <div class="column is-2"><span>🧩</span></div>
                  <div class="column">
                    <p class="is-size-7 has-text-centered has-text-warning">Das ({{ myAttrs.remnant }})</p>
                    <div class="field has-addons is-justify-content-center mb-0">
                      <p class="control"><button class="button is-small is-warning is-light" @click="counterResourcesToGive.remnant = Math.max(0, counterResourcesToGive.remnant - 1)">-</button></p>
                      <p class="control"><input class="input is-small has-text-centered" style="width:38px" :value="counterResourcesToGive.remnant" readonly></p>
                      <p class="control"><button class="button is-small is-warning is-light" @click="counterResourcesToGive.remnant = Math.min(myAttrs.remnant, counterResourcesToGive.remnant + 1)">+</button></p>
                    </div>
                  </div>
                </div>
              </div>

              <button class="button is-warning is-fullwidth mb-2" @click="sendCounteroffer()">📤 Enviar contraoferta</button>
              <button class="button is-light is-fullwidth" @click="makingCounteroffer = false">Volver</button>
            </div>
          </div>

          <!-- GUEST: counteroffer sent, waiting for host -->
          <div v-else-if="tradeStatus === 'counterofferPending' && !isHost" class="has-text-centered py-5">
            <button class="button is-loading is-white is-large is-rounded mb-3"></button>
            <p class="subtitle is-6">Esperando respuesta de {{ rivalName }}...</p>
            <div class="box mx-2 mt-2">
              <p class="is-size-7 has-text-grey">Tu contraoferta fue enviada.</p>
            </div>
          </div>

          <!-- HOST: reviewing counteroffer -->
          <div v-else-if="tradeStatus === 'counterofferPending' && isHost">
            <p class="title is-5 has-text-centered mb-3">Contraoferta de {{ rivalName }}</p>

            <!-- Guest (rival) propone dar -->
            <p class="label is-small mb-1">
              <span class="tag is-warning mr-1">{{ rivalName }}</span>propone dar
            </p>
            <div v-if="!(currentCounteroffer.fromGuest?.items?.length || currentCounteroffer.fromGuest?.money || currentCounteroffer.fromGuest?.clue || currentCounteroffer.fromGuest?.remnant)" class="has-text-grey is-size-7 mb-2">Nada</div>
            <div v-else class="mb-3">
              <div class="objects-container mb-1" v-if="currentCounteroffer.fromGuest?.items?.length">
                <div
                  v-for="(id, index) in currentCounteroffer.fromGuest.items" :key="id"
                  class="object-item no-hover"
                  :style="getCardStyle(index, currentCounteroffer.fromGuest.items.length)">
                  <CardObject :object="makeCardObj(id, 'rival')" />
                </div>
              </div>
              <div class="tags is-centered mb-0">
                <span v-if="currentCounteroffer.fromGuest?.money" class="tag is-warning is-light">💰 {{ currentCounteroffer.fromGuest.money }}</span>
                <span v-if="currentCounteroffer.fromGuest?.clue" class="tag is-warning is-light">🔍 {{ currentCounteroffer.fromGuest.clue }}</span>
                <span v-if="currentCounteroffer.fromGuest?.remnant" class="tag is-warning is-light">🧩 {{ currentCounteroffer.fromGuest.remnant }}</span>
              </div>
            </div>

            <!-- Host (tú) darías -->
            <p class="label is-small mb-1">
              <span class="tag is-info mr-1">Tú</span>darías a cambio
            </p>
            <div v-if="!(currentCounteroffer.fromHost?.items?.length || currentCounteroffer.fromHost?.money || currentCounteroffer.fromHost?.clue || currentCounteroffer.fromHost?.remnant)" class="has-text-grey is-size-7 mb-3">Nada</div>
            <div v-else class="mb-3">
              <div class="objects-container mb-1" v-if="currentCounteroffer.fromHost?.items?.length">
                <div
                  v-for="(id, index) in currentCounteroffer.fromHost.items" :key="id"
                  class="object-item no-hover"
                  :style="getCardStyle(index, currentCounteroffer.fromHost.items.length)">
                  <CardObject :object="makeCardObj(id, 'mine')" />
                </div>
              </div>
              <div class="tags is-centered mb-0">
                <span v-if="currentCounteroffer.fromHost?.money" class="tag is-info is-light">💰 {{ currentCounteroffer.fromHost.money }}</span>
                <span v-if="currentCounteroffer.fromHost?.clue" class="tag is-info is-light">🔍 {{ currentCounteroffer.fromHost.clue }}</span>
                <span v-if="currentCounteroffer.fromHost?.remnant" class="tag is-info is-light">🧩 {{ currentCounteroffer.fromHost.remnant }}</span>
              </div>
            </div>

            <div class="buttons is-centered">
              <button class="button is-success is-medium" @click="acceptCounteroffer()">✅ Aceptar</button>
              <button class="button is-danger is-medium" @click="rejectCounteroffer()">❌ Rechazar</button>
            </div>
          </div>

          <!-- FINISHED -->
          <div v-else-if="tradeStatus === 'finished'">
            <div class="notification is-success is-light has-text-centered">
              <p class="title is-3 has-text-success mb-2">🤝 ¡Intercambio realizado!</p>
              <div class="box mb-2">
                <p class="is-size-7 has-text-grey mb-1">Recibiste:</p>
                <div v-if="myNewItems.length === 0 && !resourcesGained.money && !resourcesGained.clue && !resourcesGained.remnant" class="has-text-grey is-size-7">Nada</div>
                <div v-else>
                  <div class="tags is-centered" v-if="myNewItems.length > 0">
                    <span v-for="item in myNewItems" :key="item.id" class="tag is-success is-medium">🎁 {{ itemName(item) }}</span>
                  </div>
                  <div class="tags is-centered" v-if="resourcesGained.money || resourcesGained.clue || resourcesGained.remnant">
                    <span v-if="resourcesGained.money" class="tag is-success is-medium">💰 +{{ resourcesGained.money }}</span>
                    <span v-if="resourcesGained.clue" class="tag is-success is-medium">🔍 +{{ resourcesGained.clue }}</span>
                    <span v-if="resourcesGained.remnant" class="tag is-success is-medium">🧩 +{{ resourcesGained.remnant }}</span>
                  </div>
                </div>
              </div>
              <div class="box">
                <p class="is-size-7 has-text-grey mb-1">Diste:</p>
                <div v-if="myLostItems.length === 0 && !resourcesLost.money && !resourcesLost.clue && !resourcesLost.remnant" class="has-text-grey is-size-7">Nada</div>
                <div v-else>
                  <div class="tags is-centered" v-if="myLostItems.length > 0">
                    <span v-for="item in myLostItems" :key="item.id" class="tag is-light is-medium">📤 {{ itemName(item) }}</span>
                  </div>
                  <div class="tags is-centered" v-if="resourcesLost.money || resourcesLost.clue || resourcesLost.remnant">
                    <span v-if="resourcesLost.money" class="tag is-light is-medium">💰 -{{ resourcesLost.money }}</span>
                    <span v-if="resourcesLost.clue" class="tag is-light is-medium">🔍 -{{ resourcesLost.clue }}</span>
                    <span v-if="resourcesLost.remnant" class="tag is-light is-medium">🧩 -{{ resourcesLost.remnant }}</span>
                  </div>
                </div>
              </div>
              <button class="button is-success mt-3" @click="closeFinished()">Cerrar</button>
            </div>
          </div>

          <!-- CANCELLED -->
          <div v-else-if="tradeStatus === 'cancelled'" class="has-text-centered">
            <div class="notification is-warning is-light">
              <p class="title is-4 mb-2">Intercambio cancelado</p>
              <p class="subtitle is-6">No se realizó ningún intercambio.</p>
              <button class="button is-warning mt-2" @click="closeFinished()">Cerrar</button>
            </div>
          </div>

        </section>

        <footer v-if="tradeStatus !== 'finished' && tradeStatus !== 'cancelled'">
          <button @click="closeModal()" class="button is-danger is-fullwidth">
            Cancelar intercambio
          </button>
        </footer>

      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js'
import CardObject from '@/components/personajes/ModalsDetallePersonaje/CardObject.vue'

export default {
  name: 'EventoIntercambio',
  components: { CardObject },
  data() {
    return {
      selectedResourcesToGive: { money: 0, clue: 0, remnant: 0 },
      selectedResourcesToWant: { money: 0, clue: 0, remnant: 0 },
      counterResourcesToGive:  { money: 0, clue: 0, remnant: 0 },
      myAttrs: { money: 0, clue: 0, remnant: 0 },
      rivalAttrs: { money: 0, clue: 0, remnant: 0 },
      tradeStatus: 'loading',
      isHost: false,
      rivalName: '',
      myPossessions: [],
      rivalPossessions: [],

      selectedWant: [],
      selectedGive: [],
      counterSelectedGive: [],
      counterSelectedWant: [],
      makingCounteroffer: false,

      currentOffer: {
        fromHost: { items: [], money: 0, clue: 0, remnant: 0 },
        fromGuest: { items: [], money: 0, clue: 0, remnant: 0 }
      },
      currentCounteroffer: {
        fromHost: { items: [], money: 0, clue: 0, remnant: 0 },
        fromGuest: { items: [], money: 0, clue: 0, remnant: 0 }
      },

      myNewItems: [],
      myLostItems: [],
      resourcesGained: { money: 0, clue: 0, remnant: 0 },
      resourcesLost:   { money: 0, clue: 0, remnant: 0 },

      tradeApplied: false,
      pollingInterval: null,
      idInteraction: null,
      myIdUser: null,
    }
  },
  methods: {

    itemName(item) {
      return item?.translations?.es?.name || item?.name || 'Objeto desconocido'
    },

    itemNameById(id, who) {
      const list = who === 'mine' ? this.myPossessions : this.rivalPossessions
      const item = list.find(p => p.id == id)
      return item ? this.itemName(item) : `Objeto (${id})`
    },

    itemImgById(id, who) {
      const list = who === 'mine' ? this.myPossessions : this.rivalPossessions
      const item = list.find(p => p.id == id)
      return item?.img || ''
    },

    makeCardObj(id, who) {
      const name = this.itemNameById(id, who)
      const img = this.itemImgById(id, who)
      return { img, translations: { es: { name }, en: { name } } }
    },

    formatIdList(offerSide, who) {
      const items = offerSide?.items ?? (Array.isArray(offerSide) ? offerSide : [])
      if (!items.length) return 'Nada'
      return items.map(id => this.itemNameById(id, who)).join(', ')
    },

    getCardStyle(index, total) {
      const mid = (total - 1) / 2
      const rotation = (index - mid) * 5
      return {
        '--card-rotation': `${rotation}deg`,
        animationDelay: `${index * 0.08}s`,
      }
    },

    isSelectedWant(id) { return this.selectedWant.includes(id) },
    isSelectedGive(id) { return this.selectedGive.includes(id) },
    isCounterSelectedGive(id) { return this.counterSelectedGive.includes(id) },
    isCounterSelectedWant(id) { return this.counterSelectedWant.includes(id) },

    toggleWant(id) {
      const idx = this.selectedWant.indexOf(id)
      if (idx === -1) this.selectedWant.push(id)
      else this.selectedWant.splice(idx, 1)
    },
    toggleGive(id) {
      const idx = this.selectedGive.indexOf(id)
      if (idx === -1) this.selectedGive.push(id)
      else this.selectedGive.splice(idx, 1)
    },
    toggleCounterGive(id) {
      const idx = this.counterSelectedGive.indexOf(id)
      if (idx === -1) this.counterSelectedGive.push(id)
      else this.counterSelectedGive.splice(idx, 1)
    },
    toggleCounterWant(id) {
      const idx = this.counterSelectedWant.indexOf(id)
      if (idx === -1) this.counterSelectedWant.push(id)
      else this.counterSelectedWant.splice(idx, 1)
    },

    initPlayers() {
      const interaction = this.$store.state.interactionData
      const myId = this.$store.state.IDUserHost
      this.isHost = interaction.idUserHost === myId
      console.log('👤 [initPlayers] isHost:', this.isHost, '| myId:', myId)

      const getItems = (invData) => {
        if (Array.isArray(invData?.possessionsInPlay) && invData.possessionsInPlay.length > 0) return invData.possessionsInPlay
        if (Array.isArray(invData?.possessions)) return invData.possessions
        console.warn('⚠️ [getItems] no se encontraron objetos en:', invData)
        return []
      }

      if (this.isHost) {
        this.rivalName = interaction.nameUserGest || 'Invitado'
        this.myPossessions = getItems(interaction.event.invDataHost)
        this.rivalPossessions = getItems(interaction.event.invDataGest)
      } else {
        this.rivalName = interaction.nameUserHost || 'Anfitrión'
        this.myPossessions = getItems(interaction.event.invDataGest)
        this.rivalPossessions = getItems(interaction.event.invDataHost)
      }
      this.initAttrs()
      console.log('💼 [initPlayers] mis objetos:', this.myPossessions.length, '| objetos rival:', this.rivalPossessions.length)
    },

    initAttrs() {
      const interaction = this.$store.state.interactionData
      const hostAttrs = interaction.event.invDataHost?.atributes || {}
      const gestAttrs = interaction.event.invDataGest?.atributes || {}
      if (this.isHost) {
        this.myAttrs    = { money: hostAttrs.money || 0, clue: hostAttrs.clue || 0, remnant: hostAttrs.remnant || 0 }
        this.rivalAttrs = { money: gestAttrs.money || 0, clue: gestAttrs.clue || 0, remnant: gestAttrs.remnant || 0 }
      } else {
        this.myAttrs    = { money: gestAttrs.money || 0, clue: gestAttrs.clue || 0, remnant: gestAttrs.remnant || 0 }
        this.rivalAttrs = { money: hostAttrs.money || 0, clue: hostAttrs.clue || 0, remnant: hostAttrs.remnant || 0 }
      }
      console.log('💰 [initAttrs] myAttrs:', this.myAttrs, '| rivalAttrs:', this.rivalAttrs)
    },

    startPolling() {
      console.log('🔄 [startPolling] iniciando polling de intercambio')
      this.pollingInterval = setInterval(async () => {
        try {
          const result = await apiService.getGameState(this.idInteraction, this.myIdUser)
          if (!result || !result.interaction) return
          const tradeData = result.interaction.event.tradeData
          if (!tradeData) return
          console.log('📡 [polling] tradeData.status:', tradeData.status)
          this.syncTradeState(tradeData)
        } catch (e) {
          console.error('❌ [polling] error:', e)
        }
      }, 3000)
    },

    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval)
        this.pollingInterval = null
        console.log('⏹️ [stopPolling] polling detenido')
      }
    },

    syncTradeState(tradeData) {
      const emptyOffer = () => ({
        fromHost: { items: [], money: 0, clue: 0, remnant: 0 },
        fromGuest: { items: [], money: 0, clue: 0, remnant: 0 }
      })
      const prev = this.tradeStatus
      switch (tradeData.status) {
        case 'waitingOffer':
          this.tradeStatus = 'waitingOffer'
          break
        case 'offerPending':
          this.currentOffer = tradeData.offer || emptyOffer()
          this.tradeStatus = 'offerPending'
          break
        case 'counterofferPending':
          this.currentOffer = tradeData.offer || emptyOffer()
          this.currentCounteroffer = tradeData.counteroffer || emptyOffer()
          this.tradeStatus = 'counterofferPending'
          break
        case 'finished':
          if (!this.tradeApplied && tradeData.result === 'accepted') {
            this.applyTrade(tradeData.finalDeal)
          } else if (tradeData.result !== 'accepted') {
            this.tradeStatus = 'cancelled'
            this.stopPolling()
          }
          break
        case 'cancelled':
          this.tradeStatus = 'cancelled'
          this.stopPolling()
          break
      }
      if (prev !== this.tradeStatus) {
        console.log(`🔄 [syncTradeState] ${prev} → ${this.tradeStatus}`)
      }
    },

    applyTrade(finalDeal) {
      if (this.tradeApplied) return
      this.tradeApplied = true
      console.log('🤝 [applyTrade] aplicando trato:', finalDeal)

      const fromHostItems  = finalDeal.fromHost?.items  ?? finalDeal.fromHost  ?? []
      const fromGuestItems = finalDeal.fromGuest?.items ?? finalDeal.fromGuest ?? []
      const fromHostRes  = { money: finalDeal.fromHost?.money  || 0, clue: finalDeal.fromHost?.clue  || 0, remnant: finalDeal.fromHost?.remnant  || 0 }
      const fromGuestRes = { money: finalDeal.fromGuest?.money || 0, clue: finalDeal.fromGuest?.clue || 0, remnant: finalDeal.fromGuest?.remnant || 0 }

      const possessions = Array.isArray(this.$store.state.datosPJactual.possessions)
        ? [...this.$store.state.datosPJactual.possessions]
        : [...(this.$store.state.possessionsInPlay || [])]

      let itemsReceived = []
      let itemsLost = []

      if (this.isHost) {
        itemsLost     = fromHostItems.map(id => this.findItem(id, 'mine')).filter(Boolean)
        itemsReceived = fromGuestItems.map(id => this.findItem(id, 'rival')).filter(Boolean)
        this.resourcesGained = { money: fromGuestRes.money, clue: fromGuestRes.clue, remnant: fromGuestRes.remnant }
        this.resourcesLost   = { money: fromHostRes.money,  clue: fromHostRes.clue,  remnant: fromHostRes.remnant }
      } else {
        itemsLost     = fromGuestItems.map(id => this.findItem(id, 'mine')).filter(Boolean)
        itemsReceived = fromHostItems.map(id => this.findItem(id, 'rival')).filter(Boolean)
        this.resourcesGained = { money: fromHostRes.money,  clue: fromHostRes.clue,  remnant: fromHostRes.remnant }
        this.resourcesLost   = { money: fromGuestRes.money, clue: fromGuestRes.clue, remnant: fromGuestRes.remnant }
      }

      const lostIds = itemsLost.map(i => i.id)
      const newPossessions = possessions.filter(p => !lostIds.includes(p.id))
      itemsReceived.forEach(item => newPossessions.push(item))

      if (Array.isArray(this.$store.state.datosPJactual.possessions)) {
        this.$store.state.datosPJactual.possessions = newPossessions
      } else {
        this.$store.state.possessionsInPlay = newPossessions
      }

      const attrs = this.$store.state.datosPJactual.atributes
      if (this.isHost) {
        attrs.money   = Math.max(0, attrs.money   - fromHostRes.money   + fromGuestRes.money)
        attrs.clue    = Math.max(0, attrs.clue    - fromHostRes.clue    + fromGuestRes.clue)
        attrs.remnant = Math.max(0, attrs.remnant - fromHostRes.remnant + fromGuestRes.remnant)
      } else {
        attrs.money   = Math.max(0, attrs.money   - fromGuestRes.money   + fromHostRes.money)
        attrs.clue    = Math.max(0, attrs.clue    - fromGuestRes.clue    + fromHostRes.clue)
        attrs.remnant = Math.max(0, attrs.remnant - fromGuestRes.remnant + fromHostRes.remnant)
      }

      this.myNewItems  = itemsReceived
      this.myLostItems = itemsLost

      console.log('📥 [applyTrade] recibidos:', itemsReceived.map(i => this.itemName(i)))
      console.log('📤 [applyTrade] dados:', itemsLost.map(i => this.itemName(i)))
      console.log('💰 [applyTrade] recursos aplicados | money:', attrs.money, 'clue:', attrs.clue, 'remnant:', attrs.remnant)

      this.saveInvestigadorToAPI()
      this.tradeStatus = 'finished'
      this.stopPolling()
    },

    findItem(id, who) {
      const list = who === 'mine' ? this.myPossessions : this.rivalPossessions
      return list.find(p => p.id == id) || null
    },

    async saveInvestigadorToAPI() {
      try {
        const idUser = this.$store.state.IDUserHost
        const payload = { ...this.$store.state.datosPJactual, idUser }
        console.log('💾 [saveInvestigadorToAPI] guardando investigador:', idUser)
        await apiService.postInvOnLine(payload)
        console.log('✅ [saveInvestigadorToAPI] guardado correctamente')
      } catch (e) {
        console.error('❌ [saveInvestigadorToAPI] Error:', e)
      }
    },

    async sendOffer() {
      const fromHost = {
        items: [...this.selectedGive],
        money: this.selectedResourcesToGive.money,
        clue: this.selectedResourcesToGive.clue,
        remnant: this.selectedResourcesToGive.remnant
      }
      const fromGuest = {
        items: [...this.selectedWant],
        money: this.selectedResourcesToWant.money,
        clue: this.selectedResourcesToWant.clue,
        remnant: this.selectedResourcesToWant.remnant
      }
      console.log('📤 [sendOffer] fromHost:', fromHost, '| fromGuest:', fromGuest)
      try {
        await apiService.sendTradeOffer(this.idInteraction, this.myIdUser, fromHost, fromGuest)
        this.currentOffer = { fromHost, fromGuest }
        this.tradeStatus = 'offerPending'
        this.$buefy.toast.open({ message: 'Oferta enviada', type: 'is-success', duration: 2000 })
      } catch (e) {
        console.error('❌ [sendOffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al enviar oferta', type: 'is-danger', duration: 3000 })
      }
    },

    async acceptOffer() {
      console.log('✅ [acceptOffer] aceptando oferta')
      try {
        await apiService.guestRespondToTradeOffer(this.idInteraction, this.myIdUser, 'accepted')
        this.applyTrade(this.currentOffer)
      } catch (e) {
        console.error('❌ [acceptOffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al aceptar', type: 'is-danger', duration: 3000 })
      }
    },

    startCounteroffer() {
      this.makingCounteroffer = true
      this.counterSelectedGive = []
      this.counterSelectedWant = []
      this.counterResourcesToGive = { money: 0, clue: 0, remnant: 0 }
      console.log('🔄 [startCounteroffer] abriendo pantalla de contraoferta')
    },

    async sendCounteroffer() {
      const fromHost = {
        items: [...this.counterSelectedWant],
        money: 0, clue: 0, remnant: 0
      }
      const fromGuest = {
        items: [...this.counterSelectedGive],
        money: this.counterResourcesToGive.money,
        clue: this.counterResourcesToGive.clue,
        remnant: this.counterResourcesToGive.remnant
      }
      console.log('🔄 [sendCounteroffer] fromHost:', fromHost, '| fromGuest:', fromGuest)
      try {
        await apiService.guestRespondToTradeOffer(this.idInteraction, this.myIdUser, 'counteroffer', fromHost, fromGuest)
        this.currentCounteroffer = { fromHost, fromGuest }
        this.makingCounteroffer = false
        this.tradeStatus = 'counterofferPending'
        this.$buefy.toast.open({ message: 'Contraoferta enviada', type: 'is-warning', duration: 2000 })
      } catch (e) {
        console.error('❌ [sendCounteroffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al enviar contraoferta', type: 'is-danger', duration: 3000 })
      }
    },

    async acceptCounteroffer() {
      console.log('✅ [acceptCounteroffer] aceptando contraoferta')
      try {
        await apiService.hostResolveCounteroffer(this.idInteraction, this.myIdUser, 'accepted')
        this.applyTrade(this.currentCounteroffer)
      } catch (e) {
        console.error('❌ [acceptCounteroffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al aceptar contraoferta', type: 'is-danger', duration: 3000 })
      }
    },

    async rejectCounteroffer() {
      console.log('❌ [rejectCounteroffer] rechazando contraoferta')
      try {
        await apiService.hostResolveCounteroffer(this.idInteraction, this.myIdUser, 'rejected')
        this.tradeStatus = 'cancelled'
        this.stopPolling()
        this.$buefy.toast.open({ message: 'Contraoferta rechazada', type: 'is-warning', duration: 2000 })
      } catch (e) {
        console.error('❌ [rejectCounteroffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al rechazar contraoferta', type: 'is-danger', duration: 3000 })
      }
    },

    closeFinished() {
      this.$store.state.showSwithcherEventsOnLine = false
      this.$store.state.showGuestInvitationModal = false
    },

    closeModal() {
      if (this.tradeStatus === 'finished' || this.tradeStatus === 'cancelled') {
        this.closeFinished()
        return
      }
      const isEs = this.$store.state.lenguaje === 'español'
      this.$buefy.dialog.confirm({
        title: isEs ? 'Cancelar intercambio' : 'Cancel trade',
        message: isEs
          ? '¿Estás seguro? <br><strong>El intercambio se cancelará para ambos jugadores.</strong>'
          : 'Are you sure? <br><strong>The trade will be cancelled for both players.</strong>',
        confirmText: isEs ? 'Sí, cancelar' : 'Yes, cancel',
        cancelText: isEs ? 'No, volver' : 'No, go back',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          console.log('🚫 [closeModal] cancelando intercambio')
          try {
            await apiService.cancelTrade(this.idInteraction, this.myIdUser)
          } catch (e) {
            console.warn('⚠️ [closeModal] error al cancelar (puede que ya esté finalizado):', e)
          }
          this.stopPolling()
          this.closeFinished()
          this.$buefy.toast.open({
            message: isEs ? 'Intercambio cancelado' : 'Trade cancelled',
            type: 'is-warning',
            duration: 2000
          })
        }
      })
    }
  },

  mounted() {
    this.idInteraction = this.$store.state.interactionData.idInteraccionOnLine
    this.myIdUser = this.$store.state.IDUserHost
    console.log('🚀 [trade mounted] idInteraction:', this.idInteraction, '| myIdUser:', this.myIdUser)

    this.initPlayers()

    const tradeData = this.$store.state.interactionData.event.tradeData
    console.log('📊 [trade mounted] tradeData inicial:', tradeData)

    if (tradeData) {
      this.syncTradeState(tradeData)
    } else {
      this.tradeStatus = 'waitingOffer'
    }

    this.startPolling()
  },

  beforeUnmount() {
    this.stopPolling()
  }
}
</script>

<style scoped>
.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}

.objects-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem 0.25rem;
}

.object-item {
  width: 25%;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
  transform: rotate(var(--card-rotation, 0deg));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.object-item:hover {
  transform: rotate(0deg) translateY(-6px) scale(1.05);
  z-index: 10;
}

.object-item.is-selected {
  transform: rotate(0deg) translateY(-10px) scale(1.08);
  z-index: 10;
}

.object-item.is-selected ::v-deep .card-image {
  box-shadow: 0 0 0 3px #48c78e, 0 0 14px rgba(72, 199, 142, 0.7);
}

.object-item.no-hover {
  cursor: default;
}

.object-item.no-hover:hover {
  transform: rotate(var(--card-rotation, 0deg));
  z-index: auto;
}
</style>