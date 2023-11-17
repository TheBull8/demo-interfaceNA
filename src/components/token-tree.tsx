import React, { useState, useEffect, useCallback } from "react";


import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAccount } from "wagmi";
import { itemAPI } from "./apis/fetchData";
import { INftItems } from "../types/types";

const CHAT_ID = import.meta.env.VITE_CHAT_ID;
const CHAT_AUTH = import.meta.env.VITE_CHAT_AUTH;

const coordinates = [
  [102.0835727024093, 14.972782907195878],
  [102.08245690345836, 14.970274664701037],
  [102.07771475791998, 14.971787905422005],
  [102.07804735183862, 14.967714568737605],
  [102.08642657280194, 14.966201299252418],
  [102.08680208206363, 14.968139526055339],
  [102.08907659530837, 14.971476966420795],
  [102.08406622886764, 14.969321110264545],
  [102.08406622886764, 14.97056487607854],
  [102.08506401062186, 14.971860457791223],
];

const TokenTree = ({ onHover }) => {
  // get user address
  const address = useAccount().address;

  //   set nft trees
  const [nfts, setNfts] = useState<[] | null>();

  const handleClick = () => {
    const modal = document.getElementById("my_modal1");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  //   fetch all NFTs
  const nftItems = itemAPI.getItemsByOwnerWithOwnership(
    `ETHEREUM:${address}`,
    "600"
  );
  useEffect(() => {
    // fetch nfts to display in profile page

    nftItems
      .then((result) => {
        const greenantNft = result.items.filter((nftItem) => {
          return (
            nftItem.item.contract ===
            "POLYGON:0x9b400b6f474f6c2d5a5ea96adb4e244e616a9097"
          );
        });
        setNfts(greenantNft);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(nfts);

  return (
    <>
      <h1 className="text-xl font-bold mt-[110px] ml-12 pb-5">
        My tokenized trees
      </h1>
      <div className="token-card overflow-y-auto">
        {
          !address ? (
            <div className="flex justify-center items-center">
              <w3m-button />
            </div>
          ) : nfts && nfts.length > 0 ? (
            nfts.map((item: INftItems) => (
              <a href="https://redant.world/marketplace" target="_blank">
                <TreeItem
                  key={item.item.id}
                  name={item.item.meta.name}
                  imageUrl={item.item.meta.content[0].url}
                  id={item.item.id}
                  info={item.item.meta.attributes}
                  onHover={onHover}
                />
              </a>
            ))
          ) : (
            <div>
              <h1 className="text-xl mx-auto font-bold text-center">
                No NFTrees Found
              </h1>
            </div>
          )

          //   coordinates.map((coords, index) => (
          //     <TreeItem
          //       key={index}
          //       lat={coords[0]}
          //       lon={coords[1]}
          //       index={index}
          //       onHover={onHover}
          //     />
          //   ))
        }
      </div>
    </>
  );
};
export default TokenTree;

const TreeItem = ({ name, imageUrl, id, info, onHover }) => {
  //   const handleMouseEnter = () => {
  //     const hoveredData = {
  //       lat,
  //       lon,
  //       index,
  //     };

  //     // Call the onHover callback function from TokenTree
  //     onHover(hoveredData);
  //   };
  return (
    <>
      {/* <dialog id={`my_modal_${index}`} className="modal w-1/4 mx-auto">
        <div className="modal-box">
          <form method="dialog">
            /* if there is a button in form, it will close the modal 
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col justify-center py-3 ">
            <LazyLoadImage
              src="/images/tree-modal.svg"
              alt="/images/alt-modal.svg"
              className="send-icon mt-4"
            />
            <h1 className="text-xl font-bold mt-5">Project Sputnik</h1>
            <p className="text-primary-gray text-sm mt-5">
              20kg carbon stored as of date
            </p>
            <div className="divider my-2"></div>
            <div className="flex items-center my-2 ml-3">
              <h6 className="flex text-primary-gray min-w-[40%] text-sm">
                Tree Specie
              </h6>
              <p className="text-sm">Alstonia Scholaris</p>
            </div>
            <div className="flex items-center my-2 ml-3">
              <h6 className="flex text-primary-gray min-w-[40%] text-sm">
                Location
              </h6>
              <p className="text-sm">Ho Chi Minh City, Vietnam</p>
            </div>
            <div className="flex items-center my-2 ml-3">
              <h6 className="flex text-primary-gray min-w-[40%] text-sm">
                Geo-coordinates
              </h6>
              <p className="text-sm">
                {lat}, {lon}
              </p>
            </div>
            <div className="flex items-center my-2 ml-3">
              <h6 className="flex text-primary-gray min-w-[40%] text-sm">
                Contract Date
              </h6>
              <p className="text-sm">25 Sep 2023 - 26 Sep 2024</p>
            </div>
            <div className="flex items-center my-2 ml-3">
              <h6 className="flex text-primary-gray min-w-[40%] text-sm">
                Date tokenized
              </h6>
              <p className="text-sm">25 Sep 2023 </p>
            </div>
            <div className="flex items-center my-2 ml-3">
              <h6 className="flex text-primary-gray min-w-[40%] text-sm">
                Date planned
              </h6>
              <p className="text-sm">25 Sep 2023</p>
            </div>
            <div className="flex items-center justify-center my-8">
              <button className="btn btn-outline btn-primary rounded-full custom-outline  hover:text-white mr-5 w-48 normal-case">
                <FaPen />
                Edit project
              </button>
              <button className="btn btn-outline rounded-full w-48 normal-case">
                <FaRegCircleXmark />
                Withdraw project
              </button>
            </div>
          </div>
        </div>
      </dialog> */}
      <div
        className="flex justify-center border-b-[2px] py-3 cursor-pointer hover:bg-light-gray focus:bg-primay"
        // onMouseEnter={handleMouseEnter}
        // onClick={() => document.getElementById(`my_modal_${index}`).showModal()}
      >
        <LazyLoadImage
          src={imageUrl}
          width={100}
          alt="NFTree"
          className="send-icon"
        />
        <div className="flex flex-col ml-5">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="text-primary-gray text-sm">
            20kg carbon stored as of date
          </p>
          <div className="divider my-2"></div>
          <div className="flex items-center">
            <h6 className="flex text-primary-gray min-w-[40%] text-sm">
              Tree Specie
            </h6>
            <p className="text-sm">{info[4].value}</p>
          </div>
          <div className="flex items-center">
            <h6 className="flex text-primary-gray min-w-[40%] text-sm">
              Location
            </h6>
            <p className="text-sm">{`${info[2].key} ${info[2].value}, ${info[3].key} ${info[3].value}`}</p>
          </div>
          <div className="flex items-center">
            <h6 className="flex text-primary-gray min-w-[40%] text-sm">
              Contract Date
            </h6>
            <p className="text-sm">{info[5].value}</p>
          </div>
        </div>
      </div>
    </>
  );
};
