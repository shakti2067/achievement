<!-- Below component we are using for multiple option select with custom search get label with call api using react-select  -->

<!-- <SelectProductFilter
    isCategoryModule={isCategoryModule}
    productsValue={productsValue}
    setProductsValue={setProductsValue}
    refetchImages={refetchImages}
    setSelectedImages={setSelectedImages}
/> -->

<!---------------------- Component name is : SelectProductFilter ------------------------------------>

<!-- /* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import { dropDownArrowStyle } from "../../../shared/helpers/utils";
import preparePayloadToFilterImages from "../../../shared/helpers/filters";

import { ProductResponse, SelectProductFilterProps } from "../types";
import { getAllProductsWithCount } from "../../products/api";
import { getAllCategories } from "../api";
import FilterTag from "./FilterTag";
import Options from "./Options";

import { ReactComponent as SearchIcon } from "../../../assets/images/icons/search.svg";

const SelectProductFilter = ({
  isCategoryModule,
  productsValue,
  refetchImages,
  setProductsValue,
  setSelectedImages,
}: SelectProductFilterProps) => {
  const [searchInput, setSearchInput] = useState("");

  const { data: products, isLoading } = useQuery(
    isCategoryModule ? ["get-all-categories"] : ["get-all-products"],
    isCategoryModule ? getAllCategories : getAllProductsWithCount,
    {
      select: (res) => {
        return res?.data?.map((product: ProductResponse) => {
          return {
            label: product.name,
            value: product.id,
            count: product.count,
            group: "product",
          };
        });
      },
    }
  );

  const handleChange = (selectedOptions: any) => {
    const isEmpty = selectedOptions.find((ele: any) => ele.value === "");
    if (isEmpty) {
      return;
    }
    setSelectedImages([]);
    setProductsValue(selectedOptions);

    const keyToSearch = isCategoryModule ? "categoryId" : "productId";

    refetchImages(
      preparePayloadToFilterImages(
        { ids: selectedOptions, input: searchInput },
        keyToSearch
      )
    );
  };

  const getLabelForImageGroup = () => {
    const filter: any = productsValue.find(
      (filter: any) => filter.group === "image"
    );
    if (filter) {
      return filter.label.split(":")[1];
    }
    return searchInput;
  };

  const options = [
    {
      label: "Images",
      options: [
        {
          value: getLabelForImageGroup(),
          label: `Image having name : ${getLabelForImageGroup()}`,
          group: "image",
          count: null,
        },
      ],
    },
    {
      label: "Products",
      options: products,
    },
  ];

  if (isLoading) {
    return null;
  }

  const customComponents = {
    Group: ({ data, ...props }: any) => <Options data={data} props={props} />,
    MultiValue: (props: any) => <FilterTag {...props} />,
  };

  return (
    <div className="w-full relative">
      <Select
        isMulti
        options={options as any}
        components={customComponents}
        onInputChange={(value) => setSearchInput(value)}
        inputValue={searchInput}
        onChange={handleChange}
        value={productsValue}
        hideSelectedOptions={false}
        className="w-full"
        isClearable={false}
        classNamePrefix={"select-product"}
        styles={dropDownArrowStyle}
        closeMenuOnSelect={false}
        placeholder={`Select or search by ${
          isCategoryModule ? "category" : "Product name"
        } or Image name`}
      />
      <SearchIcon className="absolute top-[0.55rem] left-[0.8rem]" />
    </div>
  );
};

export default SelectProductFilter; -->

<!------------------------------ Component name  : Option ------------------------------------------>

<!-- import CheckboxOption from "./CheckboxOption";

function Options({ data, props }: any) {
  return (
    <div className="p-3 border-t border-gray-100">
      <p className="text-sm font-medium text-[#111827] mb-3">{data.label}</p>
      {props?.options?.map((item: any, index: number) => (
        <CheckboxOption
          key={index}
          data={item?.data}
          isSelected={item?.isSelected}
          selectOption={props?.selectOption}
        />
      ))}
    </div>
  );
}

export default Options; -->

<!-------------------------------- Component name : CheckboxOption  -------------------------------->

<!-- import { CheckboxOptionProps } from "../types";

const CheckboxOption = ({
  data,
  isSelected,
  selectOption,
}: CheckboxOptionProps) => {
  return (
    <div>
      <label
        className="items-center !w-full cursor-pointer"
        onClick={() => selectOption(data)}
      >
        <input
          className="cursor-pointer !mt-0"
          type="checkbox"
          checked={isSelected}
          onChange={() => {}}
        />
        <span className="text-xs text-gray-700 font-medium">{data.label}</span>
        {data?.count !== null && (
          <span className="px-2 py-[2px] bg-[#F3F4F6] text-[#6B7280] rounded-xl text-center text-[10px] font-normal">
            {data?.count}
          </span>
        )}
      </label>
    </div>
  );
};

export default CheckboxOption; -->

<!-------------------------- Component name : FilterTag ------------------------------>

<!-- /_ eslint-disable @typescript-eslint/no-explicit-any _/
import { ReactComponent as IndigoIcon } from "../../../assets/images/icons/icon-indigo.svg";

function FilterTag(props: any) {
const { data, innerRef, innerProps, removeProps } = props;
const { label, group, count } = data;

return (
<div className="custom-tag" ref={innerRef} {...innerProps}>
{group}: {group === "image" ? label.split(":")[1] : label}{" "}
{group === "product" && `(${count})`}
<button
onClick={() => removeProps.onClick()}
onMouseDown={removeProps.onMouseDown} >
<IndigoIcon />
</button>
</div>
);
}

export default FilterTag; -->

<!---------------------------------------------------------------------------------------------->
<!-- Below code that we are using for image load while caching image  -->

<!-- <ImgLoad imgPath={image?.thumbnailURL || image?.imageURL} />  -->

<!--

import { useState } from "react";

type ImgLoadProps = {
  imgPath: string;
  imageRef?: any;
  alt?: string;
  className?: string;
};

const ImgLoad = ({ imgPath, alt, imageRef, className }: ImgLoadProps) => {
  const [imgLoad, setImgLoad] = useState(true);

  const onloadEvent = () => {
    setImgLoad(false);
  };

  return (
    <div className={`mb-2 relative ${!imageRef?.current && "z-[-1]"}`}>
      {imgLoad && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center">
          <div className="load-wraper">
            <div className="activity"></div>
          </div>
        </div>
      )}
      <img
        ref={imageRef}
        onLoad={onloadEvent}
        src={imgPath}
        alt={alt || "product-image"}
        loading="lazy"
        className={className || "w-full h-[139px] rounded-md object-contain"}
      />
    </div>
  );
};

export default ImgLoad; -->
