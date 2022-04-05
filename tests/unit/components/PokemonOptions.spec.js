import { shallowMount } from "@vue/test-utils";
import  PokemonOptions  from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";

describe('PokemonOptions component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons
            }
        })
    })

    test('debe de hacer match con el snapshot', () => {
        
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('debe de mostrar las 4 opciones correctamente', () => {
        const liTags = wrapper.findAll('li')
        
        expect(liTags.length).toBe(4)

        liTags.forEach((li, index) => {
            expect(li.text()).toBe(pokemons[index].name)
        })
    });

    test('debe de emitir selection con sus respectivos parametros al hacer click', () => {
        const [ li1, li2, li3, li4 ] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')

        expect(wrapper.emitted('selectionPokemon').length).toBe(4)

        expect(wrapper.emitted('selectionPokemon')[0]).toEqual([1])
        expect(wrapper.emitted('selectionPokemon')[1]).toEqual([2])
        expect(wrapper.emitted('selectionPokemon')[2]).toEqual([3])
        expect(wrapper.emitted('selectionPokemon')[3]).toEqual([4])
    });
})