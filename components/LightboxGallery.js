import ModalCloseBtn from "./ModalCloseBtn.js";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "components/Image";

export default function PostLightbox({ lightboxImage, handleClose }) {
  return (
    <>
      <Transition appear show={!!lightboxImage} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="fixed inset-0 h-screen w-full transition-all"
                  onClick={handleClose}
                >
                  <div className="flex h-screen w-screen cursor-zoom-out">
                    <div className="m-auto">
                      <div className="h-screen w-screen">
                        {lightboxImage && (
                          <Image
                            alt=""
                            src={lightboxImage}
                            fill
                            className="max-h-screen max-w-full rounded object-contain object-center"
                            onClick={handleClose}
                            onKeyPress={handleClose}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <ModalCloseBtn />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
