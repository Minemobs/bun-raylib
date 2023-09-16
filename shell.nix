{ pkgs ? import <nixpkgs> {} }:
let
  unstable = import <nixpkgs-unstable> {};
in
pkgs.mkShell {
  nativeBuildInputs = [
    unstable.bun
    pkgs.glibc
    pkgs.clang
    pkgs.llvm
    pkgs.clang-tools
    pkgs.nix-ld
    pkgs.libcxxStdenv
    pkgs.gdb
    pkgs.cmake
    pkgs.xorg.libX11
    pkgs.xorg.libXrandr
    pkgs.xorg.libXinerama
    pkgs.xorg.libXcursor
    pkgs.xorg.libXi
    pkgs.glfw
  ];
}