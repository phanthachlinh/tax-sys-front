// import React from 'react';
// import Enzyme, { shallow } from 'enzyme';
// import { Pagination } from './pagination';
// import { shallowToJson } from 'enzyme-to-json';
// import Adapter from 'enzyme-adapter-react-16'
// Enzyme.configure({ adapter: new Adapter() });
// describe('pagination items', () => {
// 	it('it should not display anyting 0 clients', () => {
// 		expect(shallow(<Pagination getClients={() => { }} totalCount={0} activePage={0} searchTerm="" />).find("PageNumber")).toHaveLength(0)
// 	})
// 	it('it should display 1 item', () => {
// 		expect(shallow(<Pagination getClients={() => { }} totalCount={5} activePage={1} searchTerm="" />).find("PageNumber")).toHaveLength(1)
// 	})
// 	it('it should display 2 item 1,2 count 6', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={6} activePage={1} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["1", "2"])
// 	})
// 	it('it should display 2 item 1,2 count 10', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={10} activePage={1} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["1", "2"])
// 	})
// 	it('it should display 3 item 1,2,3 count 11', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={11} activePage={1} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["1", "2", "3"])
// 	})
// 	it('it should display 3 item 1,2,3 count 15', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={11} activePage={1} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["1", "2", "3"])
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={16} activePage={2} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["1", "2", "3", "4"])
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={20} activePage={2} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["1", "2", "3", "4"])
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={21} activePage={3} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["1", "2", "3", "4", "5"])
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={25} activePage={3} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["1", "2", "3", "4", "5"])
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={26} activePage={4} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["2", "3", "4", "5", "6"])
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={30} activePage={4} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["2", "3", "4", "5", "6"])
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let results: Array<string> = []
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={30} activePage={4} searchTerm="" />)
// 		wrapper.find("PageNumber").forEach(pageNumber => {
// 			results.push(pageNumber.text())
// 		})
// 		expect(results).toEqual(["2", "3", "4", "5", "6"])
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={1} activePage={1} searchTerm="" />)
// 		expect(wrapper.find("PageArrowWrapper").length).toBe(0)
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={11} activePage={2} searchTerm="" />)
// 		expect(wrapper.find("PageArrowWrapper").length).toBe(2)
// 	})
// 	it('it should display 4 item 1,2,3,4 count 15', () => {
// 		let wrapper = shallow(<Pagination getClients={() => { }} totalCount={11} activePage={3} searchTerm="" />)
// 		expect(wrapper.find("PageArrowWrapper").length).toBe(1)
// 	})
// })
